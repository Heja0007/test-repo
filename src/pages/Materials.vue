<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="container-fluid" v-if="!showInputdata">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-lg-9">
                    <v-text-field label="Query" v-model="filters.query"
                      >Search</v-text-field
                    >
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group text-center m-3">
                      <button
                        @click="getData()"
                        type="button"
                        class="btn btn-secondary"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group text-center m-3">
              <button
                @click="toggleInputData()"
                type="button"
                class="btn btn-secondary"
              >
                <span v-if="!showInputdata">Add Your Own Data</span>
                <span v-else>Cancel</span>
              </button>
            </div>
            <div class="container-fluid" v-if="showInputdata">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-lg-9">
                    <v-text-field
                      label="Type and press Enter to add"
                      v-model="inputText"
                      @keyup.enter="addText"
                    >
                      Search
                    </v-text-field>
                    <ul>
                      <li v-for="(text, index) in input.documents" :key="index">
                        {{ text }}
                        <button @click="removeText(index)">Remove</button>
                      </li>
                    </ul>
                  </div>
                  <div class="col-lg-9">
                    <v-text-field label="Query" v-model="input.query"
                      >Search</v-text-field
                    >
                  </div>
                  <div class="col-lg-3">
                    <div class="form-group text-center m-3">
                      <button
                        @click="inputSearchData"
                        type="button"
                        class="btn btn-secondary"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="row" v-if="chart">
        <div class="col-12">
          <chart-card
            title="BM25 vs TFIDF"
            :chart-data="activityChart.data"
            :chart-options="activityChart.options"
            chart-type="Bar"
          >
            <div slot="legend" class="align-items-center justify-content-cente">
              <i class="fa fa-circle text-info"></i> BM25
              <i class="fa fa-circle text-warning"></i> TFIDF
            </div>
          </chart-card>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <card :title="table1.title">
        <div slot="raw-content" class="table-responsive">
          <div class="table-responsive">
            <paper-table
              type="table table-hover table-responsive"
              :title="table1.title"
              :data="bm25.data"
              :columns="headers"
            >
            </paper-table>
          </div>
        </div>
      </card>
    </div>
    <div class="col-lg-6">
      <card :title="table2.title">
        <div slot="raw-content" class="table-responsive">
          <div class="table-responsive">
            <paper-table
              type="table table-hover table-responsive"
              :title="table1.title"
              :data="tfidf.data"
              :columns="headers"
            >
            </paper-table>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import qs from "qs"; // Import qs library
import { disconnect } from "process";
import PaperTable from "../components/PaperTable.vue";
import helper from "../helper";
import "vue-slider-component/theme/default.css";
import { ChartCard } from "@/components/index";
export default {
  components: {
    disconnect,
    PaperTable,
    ChartCard,
  },
  data() {
    return {
      showInputdata: false,
      table1: {
        title: "Bm25",
      },
      table2: {
        title: "Tf-Idf",
      },
      headers: ["docId", "document", "score"],
      bm25: {
        total: 0,
        data: [],
      },
      tfidf: {
        total: 0,
        data: [],
      },
      filters: {
        query: "this is first document",
        sort_by: null,
        sort: "asc",
      },
      inputText: "",
      input: {
        query: "",
        documents: [],
      },
      chart: false,
      activityChart: {
        data: {
          labels: [],
          series: [],
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
          },
          height: "245px",
        },
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(page) {
      this.chart = false;
      if (typeof page !== "number") {
        page = 1;
      }
      let url = helper.getFilterURL(this.filters);
      this.axios
        .get(`/search?page=` + page + "&" + url)
        .then((response) => {
          console.log(response.data);
          this.bm25.data = response.data.bm25;
          this.bm25.total = this.bm25.data.count;
          this.tfidf.data = response.data.tfidf;
          this.tfidf.total = this.tfidf.data.count;
          console.time("new");
          this.showChart();
          console.timeEnd("new");
        })
        .catch((error) => {
          (this.bm25 = {
            total: 0,
            data: [],
          }),
            (this.tfidf = {
              total: 0,
              data: [],
            });
        });
    },
    async inputSearchData() {
      this.chart = false;
      const configHeaders = {
        "content-type": "application/json",
        Accept: "application/json",
      };
      const requestBody = {
        query: this.input.query,
        documents: this.input.documents,
      };

      // const dataToSend = {
      //   ...requestBody,
      //   documents: JSON.stringify(requestBody.documents),
      // };
      await this.axios
        .post("/search", requestBody, {"headers": configHeaders})
        .then((response) => {
          console.log(response.data);
          this.bm25.data = response.data.bm25;
          this.bm25.total = this.bm25.data.count;
          this.tfidf.data = response.data.tfidf;
          this.tfidf.total = this.tfidf.data.count;
          console.time("new");
          this.showChart();
          console.timeEnd("new");
        })
        .catch((error) => {
          (this.bm25 = {
            total: 0,
            data: [],
          }),
            (this.tfidf = {
              total: 0,
              data: [],
            });
        });
    },
    showChart() {
      this.chart = true;
      this.activityChart.data.labels = this.bm25.data.map(
        (entry) => entry.docId,
      );
      this.activityChart.data.series = [
        this.bm25.data.map((entry) => entry.score),
        this.tfidf.data.map((entry) => entry.score),
      ];
      console.log(this.activityChart);
    },
    addText() {
      if (this.inputText.trim() !== "") {
        this.input.documents.push(this.inputText);
        this.inputText = ""; // Clear input after adding
      }
    },
    removeText(index) {
      this.input.documents.splice(index, 1);
    },
    toggleInputData() {
      this.showInputdata = !this.showInputdata;
    },
  },
};
</script>
<style></style>
