import { UserInfoModel, LoginInPutType, LoginOutPutType } from "../types";
const axios = require("axios");
const url = "https://pharmgo.gosuite.kr/api/pharm/token";

class LoginService {
  async getUserInfoModel(loginInfo: LoginInPutType): Promise<any> {
    // return loginInfo;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(loginInfo);
    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    const result = await fetch(
      "https://pharmgo.gosuite.kr/api/pharm/token",
      requestOptions
    )
      .then(response => {
        return response.json();
      })
      .then(serverArticles => {
        // console.log(serverArticles);
        // const loginArticles = serverArticles
        //   .filter((serverArticle: any) => serverArticle.UserInfo)
        //   .map(this.map);
        return serverArticles.UserInfo;
      })
      .catch(error => console.log("error", error));
    // var result = fetch(url, {
    //   method: "POST",
    //   headers: new Headers(),
    //   body: JSON.stringify(loginInfo)
    // })
    //   .then(response => {
    //     console.log(response.json());
    //     return response.json();
    //   })
    //   .catch(e => {
    //     console.error(
    //       "An error occurred retrieving the news articles from " + url,
    //       e
    //     );
    //   });
    // console.log(loginInfo);
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // var raw = JSON.stringify(loginInfo);
    // var params = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: loginInfo
    // };
    // let res = await axios.post(url, params);
    // console.log(res.data);
    // // return res.data;

    // console.log(result);
    return result;
  }

  // private map(serverArticle: any): LoginOutPutType {
  //   return {
  //     ResultMsg: serverArticle.ResultMsg,
  //     UserInfo: serverArticle.UserInfo,
  //     ResultCode: serverArticle.ResultCode
  //   } as LoginOutPutType;
  // }

  private map(serverArticle: any): UserInfoModel {
    return {
      UserName: serverArticle.UserName,
      UserTel: serverArticle.UserTel,
      PharmWDEndTime: serverArticle.PharmWDEndTime,
      PharmWDSttTime: serverArticle.PharmWDSttTime,
      PharmOwnerName: serverArticle.PharmOwnerName,
      PharmID: serverArticle.PharmID,
      PharmName: serverArticle.PharmName,
      PharmOpenSetting: serverArticle.PharmOpenSetting,
      PharmOpen: serverArticle.PharmOpen,
      Token: serverArticle.Token,
      PharmStatSttTime: serverArticle.PharmStatSttTime,
      UserEmail: serverArticle.UserEmail,
      PharmAddress2: serverArticle.PharmAddress2,
      PharmSunEndTime: serverArticle.PharmSunEndTime,
      PharmTel: serverArticle.PharmTel,
      PharmAddress1: serverArticle.PharmAddress1,
      UserID: serverArticle.UserID,
      UserCareer: serverArticle.UserCareer,
      PharmSatEndTime: serverArticle.PharmSatEndTime,
      UserLiceseNo: serverArticle.UserLiceseNo,
      PharmPostNo: serverArticle.PharmPostNo,
      PharmBizNo: serverArticle.PharmBizNo,
      PharmSunSttTime: serverArticle.PharmSunSttTime,
      UserType: serverArticle.UserType
    } as UserInfoModel;
  }
}

export default new LoginService();
