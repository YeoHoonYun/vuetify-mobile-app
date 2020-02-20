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
              <v-card
                :to="{
                  path: `/prescripdetail/${PresInfo.HospitalID}/${PresInfo.IssueNo}/${PresInfo.Status}`
                }"
              >
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs9>
                      <div>
                        <div class="subheading font-weight-medium">
                          접수 번호 :
                          {{ PresInfo.HospitalID + "-" + PresInfo.IssueNo }}
                        </div>
                        <div>접수자 이름 : {{ PresInfo.PatientName }}</div>
                        <div>
                          상태 : {{ PresInfo.Status == "20" ? "접수" : "조제" }}
                        </div>
                        <div>접수 날짜 : {{ PresInfo.UpdatedTime }}</div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
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
import { PresInfo } from "../types";
// import { PreMassageType, UserInfoModel, PrescritInputModel } from "../types";
@Component
export default class PrescriptionList extends Vue {
  @Prop({ type: Array, required: true }) PresInfos!: PresInfo[];
}
</script>
