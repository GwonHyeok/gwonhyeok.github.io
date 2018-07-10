---
title: IE가 아닌 다른 브라우저에서 홈텍스 사용 시도기
date: 2018-07-10
tags: webhack
category: webhack
---



# IE가 아닌 다른 브라우저에서 홈텍스 사용 시도기



### 무엇을 해볼까

이번 글 에서는 macOS +  Chrome 조합으로 홈텍스에서 사용 불가능한 서비스를 사용해보려 한다.



### 대한민국의 공공기관 서비스

요즘은 공공기관 서비스들도 매우 조금 괜찮아 져서 윈도우 + IE 환경이 아니여도 사용할 수 있는 서비스 들이 있다.

하지만 여전히 윈도우 + IE 환경이 아니면 사용하기 매우 불편하다.

참고 : [대한민국의 웹 호환성 문제 - 위키백과](https://ko.wikipedia.org/wiki/%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%EC%9D%98_%EC%9B%B9_%ED%98%B8%ED%99%98%EC%84%B1_%EB%AC%B8%EC%A0%9C)



### 홈텍스

그렇다면 홈텍스는 어떨까

홈텍스 에서는 공인인증서 로그인이 가능하며, 종합 소득세 신고 같은 몇가지 항목들은 사용이 가능하다.

하지만 여전히 사용이 불가능한 항목들이 있다. 민원 증명 신청이 그중 하나의 예이다.



그렇다면 민원증명 신청 항목의  소득 금액 증명 항목을 사용할 수 있게 만들어 보자.



### 민원 증명 신청 - 소득 금액 증명

우선 당당하게 macOS와 Chrome Browser의 조합으로 소득 금액 증명 항목을 눌러보았다.

![제발 IE를 사용해 주세요](/assets/images/hello_hometax/capture_pleeeeze_ie.png)

결과는 처참했다.

위와 같은 alert을 띄우면서 더이상 아무것도 하지 못하게 만들어 버렸다.



그렇다면 어떻게 하면 될까 우선 저 alert을 띄우는 코드를 찾고, 우회 시키면 될 것 같다. ( 일차원 적인 생각이다 )

그럼 저 코드를 어디서 띄우는지 한번 확인해 보도록 하자.



### 제발 IE를 사용해주세요 찾기

우선 저 alert을 띄우는 코드를 찾는 방법은 정말 다양하게 있을 것 이다.



#### 정말 다양한(?) 코드 찾기 전략

* alert 문구로 검색해서 찾기
* chrome developer console의 performance profiling 기능으로 찾기
* 등등.. 상상에 맞기도록.

우선 나는  chrome developer console의 performance profiling 기능으로 찾아 보았다.

~~Performance Profiling 기능이 자세히 알고 싶다면 직접 찾아보도록 하자.~~



우선 Chrome 에서 홈텍스에 로그인을 한다.

그 후에 민원증명 신청 항목으로 들어간 상태로 Chrome Developer Console 을 연다.

Developer Console을 열면 performance탭이 보인다. 해당 탭을 눌러보자.

![개발자 콘솔, 퍼포먼스 프로파일링 탭](/assets/images/hello_hometax/capture_chrome_dc_pr.png)

그럼 위와 비슷한 화면이 나올것이다.



저 화면에 보이는 동그라미 아이콘을 눌러 Record를 시작하였고, 홈텍스에서 소득금액 증명 항목을 눌러 alert을 띄운후 완료를 누른다음 기록을 끝냈다.

결과는 아래의 이미지와 같다.

![딱 봐도 어디인지 알겠다](/assets/images/hello_hometax/capture_dc_pr_recorded.png)



결과를 보면 누가봐도 어느 부분에서 alert이 뜨는지 알 수 있다.

소득 금액 증명 결과를 누르면

jQuery Click Event 에 등록되어 있는 콜백 함수가 실행되고 (가장 밑에서 4번째 Anonymous 함수)

1. openDep2  
2. fn_chkOpenPage 
3. alert

이 순서로 함수가 실행되게 된다.



즉 fn_chkOpenPage 함수에서 alert을 띄운다는 뜻이다.

그렇다면 fn_chkOpenPage 함수는 어떻게 생겼는지 구경해보자.



####  fn_chkOpenPage

```javascript
function fn_chkOpenPage(strLgnCertCd, strCertCnfrYn, strSecCardNdYn, strUrl, strName, strMenuId) {	
	
	//2018.05.24 멀티브라우저 허용 아이디 
	var userId = nts_getSession('userId');
	var aprcPmsId = "reidesign,xbts_user1g3,xnts_user214,xnts_user302,xnts_user307,xnts_user304";
	var aprcPmsIdArr = aprcPmsId.split(',');
	var chkAprcPmsId = false;
	for(var i=0; i < aprcPmsIdArr.length; i++){
		if(userId == aprcPmsIdArr[i]){
			chkAprcPmsId = true;
			break;
		}
	}
	
	if(!chkAprcPmsId){
		if( NTS_SERVER_TYPE_DOMAIN != NTS_SERVER_TYPE_DOMAIN_JSON["DEV"] ){
			//2017.11.03 - 남궁형브라우저 종류체크함수 IE가 아니면서 업무가 YS가 아니면 메세지띄우기
			var browserInfr = nts_getBrowserInfo();
			
			if(NTS_SERVER_TYPE_DOMAIN == NTS_SERVER_TYPE_DOMAIN_JSON["VER"]){//검증환경인 경우
				if(!browserInfr.MSIE){ //IE가 아닌경우(browserInfr.MSIE = true이면 IE)
					if(strName != "PP" && strName != "YS" && strName != "ET" && strName != "CR" && !(strUrl.indexOf("/wf") > 0) && !(strMenuId == "0108010000" || strMenuId == "0108020000" || strMenuId == "0800000000" || strMenuId == "0307010100" || strMenuId == "0307010300" || strMenuId == "0317000000" || strMenuId == "0402010100" || strMenuId == "0402010200" || strMenuId == "0402010300" || strMenuId == "0402020000" || strMenuId == "0405040000" || strMenuId == "0107010000" || strMenuId == "0403000000" || strMenuId == "4005010000" || strMenuId == "4005070000" || strMenuId == "4005030000" || strMenuId == "0107020000" || strMenuId == "4005020000" || strMenuId == "0601011100" || strMenuId == "0602040600")){
						alert("원활한 홈택스 이용을 위하여 인터넷 익스플로러(IE) 8 \n이상의 브라우저를 이용하여 주시기 바랍니다.");
						return;
					}
				}
			}else{//운영환경인경우
				if(NTS_SERVER_TYPE_DOMAIN != NTS_SERVER_TYPE_DOMAIN_JSON["LOCAL"]){
					if(!browserInfr.MSIE){ //IE가 아닌경우(browserInfr.MSIE = true이면 IE)
						if(strName != "PP" && strName != "YS" && strName != "ET" && strName != "CR" && !(strUrl.indexOf("/wf") > 0) && !(strMenuId == "0108010000" || strMenuId == "0108020000" || strMenuId == "0800000000" || strMenuId == "0307010100" || strMenuId == "0307010300" || strMenuId == "0317000000" || strMenuId == "0402010100" || strMenuId == "0402010200" || strMenuId == "0402010300" || strMenuId == "0402020000" || strMenuId == "0405040000" || strMenuId == "0107010000" || strMenuId == "0403000000" || strMenuId == "4005010000" || strMenuId == "4005070000" || strMenuId == "4005030000" || strMenuId == "0107020000" || strMenuId == "4005020000" || strMenuId == "0601011100" || strMenuId == "0602040600")){						
							alert("원활한 홈택스 이용을 위하여 인터넷 익스플로러(IE) 8 \n이상의 브라우저를 이용하여 주시기 바랍니다.");
							return;
						}
					}
				}
			}
		}
	}
	
    // ================================
   	// 여기서 부터는 너무 길어서 전부 지웠습니다.
    // ================================
}
```



역시 저기 우리가 찾던 메세지가 보인다.



`alert("원활한 홈택스 이용을 위하여 인터넷 익스플로러(IE) 8 \n이상의 브라우저를 이용하여 주시기 바랍니다.");`

이 부분은 2017년 11월 3일, 남궁형 님께서 추가하신 코드인가보다.



이제 저 메세지를 우회할 방법을 생각해보자.



### 제발 IE를 사용해주세요 우회하기

사실 저 함수가 Global Function 이라 그냥 코드를 좀 지우고 console에 붙여넣기 하면됩니다. 정말 간단하다.



즉 fn_chkOpenPage 함수에서 

```javascript
	if(!chkAprcPmsId){
		if( NTS_SERVER_TYPE_DOMAIN != NTS_SERVER_TYPE_DOMAIN_JSON["DEV"] ){
			//2017.11.03 - 남궁형브라우저 종류체크함수 IE가 아니면서 업무가 YS가 아니면 메세지띄우기
			var browserInfr = nts_getBrowserInfo();
			
			if(NTS_SERVER_TYPE_DOMAIN == NTS_SERVER_TYPE_DOMAIN_JSON["VER"]){//검증환경인 경우
				if(!browserInfr.MSIE){ //IE가 아닌경우(browserInfr.MSIE = true이면 IE)
					if(strName != "PP" && strName != "YS" && strName != "ET" && strName != "CR" && !(strUrl.indexOf("/wf") > 0) && !(strMenuId == "0108010000" || strMenuId == "0108020000" || strMenuId == "0800000000" || strMenuId == "0307010100" || strMenuId == "0307010300" || strMenuId == "0317000000" || strMenuId == "0402010100" || strMenuId == "0402010200" || strMenuId == "0402010300" || strMenuId == "0402020000" || strMenuId == "0405040000" || strMenuId == "0107010000" || strMenuId == "0403000000" || strMenuId == "4005010000" || strMenuId == "4005070000" || strMenuId == "4005030000" || strMenuId == "0107020000" || strMenuId == "4005020000" || strMenuId == "0601011100" || strMenuId == "0602040600")){
						alert("원활한 홈택스 이용을 위하여 인터넷 익스플로러(IE) 8 \n이상의 브라우저를 이용하여 주시기 바랍니다.");
						return;
					}
				}
			}else{//운영환경인경우
				if(NTS_SERVER_TYPE_DOMAIN != NTS_SERVER_TYPE_DOMAIN_JSON["LOCAL"]){
					if(!browserInfr.MSIE){ //IE가 아닌경우(browserInfr.MSIE = true이면 IE)
						if(strName != "PP" && strName != "YS" && strName != "ET" && strName != "CR" && !(strUrl.indexOf("/wf") > 0) && !(strMenuId == "0108010000" || strMenuId == "0108020000" || strMenuId == "0800000000" || strMenuId == "0307010100" || strMenuId == "0307010300" || strMenuId == "0317000000" || strMenuId == "0402010100" || strMenuId == "0402010200" || strMenuId == "0402010300" || strMenuId == "0402020000" || strMenuId == "0405040000" || strMenuId == "0107010000" || strMenuId == "0403000000" || strMenuId == "4005010000" || strMenuId == "4005070000" || strMenuId == "4005030000" || strMenuId == "0107020000" || strMenuId == "4005020000" || strMenuId == "0601011100" || strMenuId == "0602040600")){						
							alert("원활한 홈택스 이용을 위하여 인터넷 익스플로러(IE) 8 \n이상의 브라우저를 이용하여 주시기 바랍니다.");
							return;
						}
					}
				}
			}
		}
	}
```



위 부분을 전부 제거하고 Chrome Developer Console에서 아래처럼 다시 해당 함수를 재정의 해주면 됩니다.

```javascript
function fn_chkOpenPage() {
	// 지울 코드는 지우고
    
    // 원래 코드 살리고
}
```



그런데 지금 코드가 너무 길어서 설명하기 어려우니, 저 함수를 수정하지 않고 유저의 브라우저 정보를 가져오는 부분에서 사용되는 `nts_getBrowserInfo` 함수를 수정하도록 한다.

```javascript
// 브라우저 정보 가져오는 함수
var browserInfr = nts_getBrowserInfo();
```



우선 해당 함수를 실행하게 되면 아래와 같이 값이 반환 된다.

```json
{
  "MSIE": false,
  "Edge": false,
  "Navigator": false,
  "Firefox": false,
  "Chrome": true,
  "Safari": false,
  "Opera": false,
  "ChromePlus": false,
  "VeraIN": false,
  "ETC": false,
  "name": "Chrome",
  "version": "67.0.3396.99"
}
```



아까 위에 올렸던 fn_chkOpenPage의 코드를 보면 nts_getBrowserInfo에서 넘어온 값에서 MSIE 항목이 true면 alert을 띄우지 않는것을 알 수 있다.

```javascript
if(!browserInfr.MSIE){
    alert("원활한 홈택스 이용을 위하여 인터넷 익스플로러(IE) 8 \n이상의 브라우저를 이용하여 주시기 바랍니다.");
    return;
}
```

즉 nts_getBrowserInfo 함수가 `{MSIE: true}`를 반환하게 하면 된다.



아래의 코드를 Chrome Console 에 입력해보았다.

```javascript
function nts_getBrowserInfo() {
    return {MSIE: true};
}
```



![코드를 입력해보았다.](/assets/images/hello_hometax/capture_dc_get_browser_info.png) 

함수를 override 한 후 다시 당당하게 소득증명 항목을 눌러보았다.

결과는 놀라웠다! 더이상 IE8을 써달라고 이야기 하지 않고 소득금액 증명 신청서를 발급받을 수 있는 화면이 나왔다.



![Hello Hometax](/assets/images/hello_hometax/capture_hello_hometax.png)



너무나도 간단하게 소득 금액 증명 신청서를 발급받아볼 수 있게 되었다..



### 마치며

이번 글에서 민원 증명 발급 신청은 성공적으로 완료 하였다.

사실 발급만 받으면 뭐하나, 조회를 할 수 있어야 한다.

하지만 조회는 큰 장벽이 존재하고 있다. 

조회도 성공적으로 우회해서 볼 수 있게 된다면 한번더 글을 올리도록 하겠다.



다음 글에는 Chrome Extension을 사용해서 직접 개발자 콘솔을 열지 않더라도 <u>제발 IE를 사용해주세요</u> 하면서 다음 화면으로 넘어가지지 않는 상황을 우회 해보도록 하겠다.
