"""
영상 얼굴 모자이크 처리 PoC
- YuNet (OpenCV) 얼굴 검출
- 검출된 얼굴에 모자이크 또는 블러 적용
- 원본 영상은 그대로 두고 마스킹된 결과만 새 파일로 출력
"""
import argparse
import time
from pathlib import Path

import cv2


def apply_mosaic(roi, block_size: int = 15):
    h, w = roi.shape[:2]
    small = cv2.resize(roi, (max(1, w // block_size), max(1, h // block_size)), interpolation=cv2.INTER_LINEAR)
    return cv2.resize(small, (w, h), interpolation=cv2.INTER_NEAREST)


def apply_blur(roi, ksize: int = 51):
    if ksize % 2 == 0:
        ksize += 1
    return cv2.GaussianBlur(roi, (ksize, ksize), 0)


def process_video(input_path: Path, output_path: Path, model_path: Path, mode: str = "mosaic", expand: float = 0.2, conf: float = 0.5):
    cap = cv2.VideoCapture(str(input_path))
    if not cap.isOpened():
        raise SystemExit(f"열 수 없음: {input_path}")

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    detector = cv2.FaceDetectorYN_create(str(model_path), "", (width, height), conf, 0.3)

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(str(output_path), fourcc, fps, (width, height))

    frames_with_face = 0
    faces_total = 0
    start = time.time()

    for idx in range(total):
        ok, frame = cap.read()
        if not ok:
            break

        _, faces = detector.detect(frame)
        if faces is not None and len(faces) > 0:
            frames_with_face += 1
            faces_total += len(faces)
            for face in faces:
                x, y, w, h = face[:4].astype(int)
                ex = int(w * expand)
                ey = int(h * expand)
                x0 = max(0, x - ex)
                y0 = max(0, y - ey)
                x1 = min(width, x + w + ex)
                y1 = min(height, y + h + ey)
                roi = frame[y0:y1, x0:x1]
                if roi.size == 0:
                    continue
                if mode == "blur":
                    frame[y0:y1, x0:x1] = apply_blur(roi)
                else:
                    frame[y0:y1, x0:x1] = apply_mosaic(roi)

        writer.write(frame)
        if (idx + 1) % 30 == 0:
            elapsed = time.time() - start
            speed = (idx + 1) / elapsed if elapsed else 0
            print(f"  {idx + 1}/{total} frames | {speed:.1f} fps")

    cap.release()
    writer.release()

    elapsed = time.time() - start
    print()
    print(f"입력:  {input_path} ({width}x{height} @ {fps:.1f}fps, {total} frames)")
    print(f"출력:  {output_path} (mode={mode})")
    print(f"얼굴 검출 프레임: {frames_with_face}/{total} | 총 얼굴 인스턴스: {faces_total}")
    print(f"처리 시간: {elapsed:.1f}s | 평균 {total / elapsed:.1f} fps")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", default="tears_of_steel.mp4")
    ap.add_argument("--output", default="output_mosaic.mp4")
    ap.add_argument("--model", default="face_detection_yunet_2023mar.onnx")
    ap.add_argument("--mode", choices=["mosaic", "blur"], default="mosaic")
    ap.add_argument("--expand", type=float, default=0.25, help="얼굴 영역 확장 비율 (0.0~1.0)")
    ap.add_argument("--conf", type=float, default=0.5, help="검출 신뢰도 임계값")
    args = ap.parse_args()

    process_video(
        Path(args.input),
        Path(args.output),
        Path(args.model),
        mode=args.mode,
        expand=args.expand,
        conf=args.conf,
    )


if __name__ == "__main__":
    main()
