<template>
  <div>
    <template>
      <div>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex
              xs12
              v-for="PresInfo in PresInfos"
              :key="PresInfo.HospitalID + '-' + PresInfo.IssueNo"
            >
              <v-card>
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex>
                      <v-list-item-content>
                        <div class="overline mb-4">
                          접수 번호 :
                          {{ PresInfo.HospitalID + "-" + PresInfo.IssueNo }}
                        </div>
                        <v-list-item-title class="headline mb-1"
                          >환자 번호 :
                          {{ PresInfo.PatientNo }}</v-list-item-title
                        >
                        <v-list-item-subtitle
                          >접수 날짜 :
                          {{ PresInfo.UpdatedTime }}</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                          >접수 병원(전화번호) :
                          {{ PresInfo.Prescription.HospitalName }}
                          ({{
                            PresInfo.Prescription.HospitalTel
                          }})</v-list-item-subtitle
                        >
                      </v-list-item-content>
                      <div>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <td>약 명칭</td>
                                <td>1회 투약량</td>
                                <td>1회 투여횟수</td>
                                <td>투약 일수</td>
                                <td>총량</td>
                                <td>메모</td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                xs12
                                v-for="Medicine in PresInfo.Prescription
                                  .Medicines"
                                :key="Medicine.Code"
                                v-on:click="eid(Medicine.Edi)"
                              >
                                <td>{{ Medicine.Name }}</td>
                                <td>{{ Medicine.Dosage }} 캅셀</td>
                                <td>{{ Medicine.Frequency }} 회</td>
                                <td>{{ Medicine.Duration }} 일</td>
                                <td>{{ Medicine.TotalDosage }} 캅셀</td>
                                <td>{{ Medicine.Memo }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-btn
                  class="ma-2"
                  color="primary"
                  @click="PresSubmit(PresInfo)"
                  >{{ PresInfo.Status == "20" ? "접수" : "조제" }}
                </v-btn>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import proscriptionService from "../services/prescriptionService";
import { PresInfo } from "../types";
// import { PreMassageType, UserInfoModel, PrescritInputModel } from "../types";

@Component
export default class PreInfoView extends Vue {
  @Prop({ type: Array, required: true }) PresInfos!: PresInfo[];
  PresSubmit(presInfo: PresInfo[]) {
    var status = (parseInt(this.$route.params.status) + 10).toString();
    var usrInfo: UserInfoModel = JSON.parse(Vue.$localStorage.get("usrInfo"));
    proscriptionService
      .putPrescriptionUpdateState(usrInfo, presInfo, status)
      .then((result: any) => {
        alert(
          status === "30" ? "접수가 완료되었습니다." : "조제가 완료되었습니다."
        );
        window.location.href =
          "http://" + document.URL.split("/")[2] + "/prescription";
      })
      .catch((e: any) => {
        console.error(
          "An error occurred retrieving the news articles from " + url,
          e
        );
      });
  }
  eid(data: String) {
    console.log(data);
    // location.href =
    //   "https://terms.naver.com/search.nhn?query=" +
    //   data +
    //   "&searchType=&dicType=&subject=";
    var myWindow = window.open(
      "https://terms.naver.com/search.nhn?query=" +
        data +
        "&searchType=&dicType=&subject=",
      "MsgWindow",
      "width=700,height=700"
    );
  }
}
</script>
