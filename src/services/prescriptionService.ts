import {
  PreMassageType,
  UserInfoModel,
  PrescritInputModel,
  PresInfo
} from "../types";

class PrescriptService {
  bottom_check: Boolean = true;

  getPrescriptByHosIDByData(
    UserInfo: UserInfoModel,
    status: number[]
  ): Promise<PresInfo[]> {
    var date = new Date();
    var inputDate = (
      date.getFullYear().toString() +
      "0" +
      (date.getMonth() + 1).toString() +
      date.getDate().toString()
    ).toString();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + UserInfo.Token);
    var url = `https://pharmgo.gosuite.kr/api/pharm/rx/${
      UserInfo.PharmID
    }/${inputDate}/${status.join("|")}`;
    var requestOptions = {
      method: "GET",
      headers: myHeaders
    };
    return fetch(url, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(serverArticles => {
        serverArticles.PresInfos.sort(
          (a: any, b: any) => Number(a.Status) - Number(b.Status)
        );
        return serverArticles.PresInfos;
      })
      .catch((e: any) => {
        console.error(
          "An error occurred retrieving the news articles from " + url,
          e
        );
      });
  }

  getPrescriptByHosIDByIssueNo(
    UserInfo: UserInfoModel,
    hosid: string,
    issno: string
  ): Promise<any> {
    // var date = new Date();
    // var inputDate = (
    //   date.getFullYear().toString() +
    //   "0" +
    //   (date.getMonth() + 1).toString() +
    //   date.getDate().toString()
    // ).toString();
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + UserInfo.Token);
    // var url = `https://pharmgo.gosuite.kr/api/pharm/rx/${UserInfo.PharmID}/${inputDate}/${status}/Y`;
    var url = `https://pharmgo.gosuite.kr/api/pharm/rx/byOne/${UserInfo.PharmID}/${hosid}/${issno}/Y`;
    var requestOptions = {
      method: "GET",
      headers: myHeaders
    };
    return fetch(url, requestOptions)
      .then(response => {
        return response.json();
      })
      .then(serverArticles => {
        // var filter = serverArticles.PresInfos.filter(
        //   (serverArticle: PresInfo) =>
        //     serverArticle.HospitalID === pathName.split("/")[2] &&
        //     serverArticle.IssueNo === pathName.split("/")[3]
        // ).map(this.map);
        serverArticles.PresInfo.Prescription = JSON.parse(
          serverArticles.PresInfo.Prescription
        );
        return [serverArticles.PresInfo];
      })
      .catch((e: any) => {
        console.error(
          "An error occurred retrieving the news articles from " + url,
          e
        );
      });
  }

  putPrescriptionUpdateState(
    UserInfo: UserInfoModel,
    PresInfo: any,
    status: number
  ): any {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${UserInfo.Token}`);

    var raw = JSON.stringify({ Status: status });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw
    };

    var url = `https://pharmgo.gosuite.kr/api/pharm/rx/status/${UserInfo.PharmID}/${PresInfo.HospitalID}/${PresInfo.IssueNo}`;
    return fetch(url, requestOptions)
      .then((response: { json: () => any }) => {
        return response.json();
      })
      .then((serverArticles: any) => {
        return serverArticles;
      })
      .catch((e: any) => {
        console.error(
          "An error occurred retrieving the news articles from " + url,
          e
        );
      });
  }

  getBottomCheck(): Boolean {
    return this.bottom_check;
  }

  setBottomCheck(c: Boolean) {
    this.bottom_check = c;
  }

  private map(serverArticle: any): PresInfo {
    return {
      Status: serverArticle.Status,
      IssueNoSeq: serverArticle.IssueNoSeq,
      ReplaceReason: serverArticle.ReplaceReason,
      UserTel: serverArticle.UserTel,
      ExtendRequestEndTime: serverArticle.ExtendRequestEndTime,
      ReceiveNo: serverArticle.ReceiveNo,
      HospitalID: serverArticle.HospitalID,
      RequestUrl: serverArticle.RequestUrl,
      PatientName: serverArticle.PatientName,
      RequestEndTime: serverArticle.RequestEndTime,
      RejectReasonDetails: serverArticle.RejectReasonDetails,
      CancelReason: serverArticle.CancelReason,
      IssueNo: serverArticle.IssueNo,
      UpdatedID: serverArticle.UpdatedID,
      RequestToken: serverArticle.RequestToken,
      RejectReason: serverArticle.RejectReason,
      UpdatedTime: serverArticle.UpdatedTime,
      RequestSttTime: serverArticle.RequestSttTime,
      CancelReasonDetails: serverArticle.CancelReasonDetails
    } as PresInfo;
  }
}

export default new PrescriptService();
