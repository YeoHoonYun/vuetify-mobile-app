export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  dateString: string;
  baseImageName: string;
  articleType: ArticleType;
  isFavourite: boolean;
}

export enum ArticleType {
  TopStory = "TOP_STORY",
  CodeExample = "CODE_EXAMPLE"
}

// Store root state
export interface RootState {
  topToolbar: TopToolbarState;
}

// Store modules state
export interface TopToolbarState {
  title: string;
}

// login
export interface LoginOutPutType {
  ResultMsg: string;
  UserInfo: UserInfoModel;
  ResultCode: boolean;
}

export interface LoginInPutType {
  PharmID: string;
  UserID: string;
  UserPW: string;
}

export interface PrescritInputModel {
  HospitalID: string;
  status: number;
  IssueNo: string;
}

export interface UserInfoModel {
  UserName: string;
  UserTel: string;
  PharmWDEndTime: string;
  PharmWDSttTime: string;
  PharmOwnerName: string;
  PharmID: string;
  PharmName: string;
  PharmOpenSetting: string;
  PharmOpen: string;
  Token: string;
  PharmStatSttTime: string;
  UserEmail: string;
  PharmAddress2: string;
  PharmSunEndTime: string;
  PharmTel: string;
  PharmAddress1: string;
  UserID: string;
  UserCareer: string;
  PharmSatEndTime: string;
  UserLiceseNo: string;
  PharmPostNo: string;
  PharmBizNo: string;
  PharmSunSttTime: string;
  UserType: string;
}

export interface PreMassageType {
  ResultMsg: string;
  PresInfos: PresInfo[];
  ResultCode: string;
}

export interface PresInfo {
  Status: string;
  IssueNoSeq: string;
  ReplaceReason: string;
  UserTel: string;
  ExtendRequestEndTime: string;
  ReceiveNo: string;
  HospitalID: string;
  RequestUrl: string;
  PatientName: string;
  RequestEndTime: string;
  RejectReasonDetails: string;
  CancelReason: string;
  IssueNo: string;
  UpdatedID: string;
  RequestToken: string;
  RejectReason: string;
  UpdatedTime: string;
  RequestSttTime: string;
  CancelReasonDetails: string;
}
