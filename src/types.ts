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
