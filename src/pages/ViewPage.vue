<template>
  <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <slot name="header">
              <h4 class="card-title text-center">Material View Page</h4>
              <v-divider></v-divider>
            </slot>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-9">
                
              </div>
              <div class="col-lg-3">
                <span class="text-right">
                  <v-btn variant="tonal" :loading="loading" @click='downloadJson()' class="btn-primary">Download Material Json</v-btn>
                </span>
              </div>
            </div>
          </div>
          <slot name="raw-content"></slot>
        </div>
      </div>
      <div class="col-xl-4 col-lg-5 col-md-6">
        <div class="card">
          <div class="card-header">
            <slot name="header">
              <h3 class="card-title justify-center">{{material.material_id}}</h3>
              <v-divider></v-divider>
            </slot>
          </div>
          <div class="card-body">
            <slot>
              <table class="table card-category">
                <tbody>
                  <tr>
                    <th scope="row"><strong>Formula:</strong></th>
                    <td><strong>{{material.formula_pretty}}</strong></td>
                  </tr>
                  <tr>
                    <th scope="row"><strong>Energy Above Hull:</strong></th>
                    <td><strong>{{formatNumber(material.energy_above_hull)}}</strong></td>
                  </tr>
                  <tr>
                    <th scope="row"><strong>Space Group:</strong></th>
                    <td> <strong>{{material.space_group}}</strong></td>
                  </tr>
                  
                  <tr>
                    <th scope="row"><strong>Band Gap:</strong></th>
                    <td><strong>{{formatNumber(material.band_gap)}}</strong></td>
                  </tr>
                  <tr>
                    <th scope="row"><strong>Total Magnetization</strong></th>
                    <td><strong>{{formatNumber(material.total_magnetization)}}</strong></td>
                  </tr>
                  <tr>
                    <th scope="row"><strong>Experimentally Observed</strong></th>
                    <td><strong>{{material.experimentally_observed == 'true' ? 'Yes' : 'No'}}</strong></td>
                  </tr>
                </tbody>
              </table>
            </slot>
          </div>
          <slot name="raw-content"></slot>
        </div>
      </div>
      <div class="col-xl-8 col-lg-7 col-md-6" v-if="material.references">
        <div class="card">
          <div class="card-header">
            <slot name="header">
              <h4 class="card-title justify-center">Details</h4>
              <v-divider></v-divider>
              <div class="row">
                  <div class="col-lg-8">
                      <p><strong>Literature References:</strong></p>
                      <br>
                      <blockquote class="blockquote" v-for="(reference, index) in material.references" :key="index">
                        <p class="mb-0">
                         <strong>Title: </strong>{{reference.title}}<br>
                        <strong>Journal:</strong>{{reference.journal}}<br>
                        <strong class="blockquote-footer">Authors: {{reference.author}}</strong>
                        <strong class="blockquote-footer">Year: {{reference.year}}</strong>
                        </p>
                      </blockquote>
                  </div>
              </div>
            </slot>
          </div>
          <div class="card-body">
            <slot></slot>
          </div>
          <slot name="raw-content"></slot>
        </div>
      </div>
      <div class="col-xl-4 col-lg-5 col-md-6" v-if="material.magnetic_data">
        <div class="card">
          <div class="card-header">
            <slot name="header">
              <h3 class="card-title justify-center">Magnetic Properties</h3>
              <v-divider></v-divider>
            </slot>
          </div>
          <div class="card-body">
            <slot>
              <table class="table card-category">
                <tbody>
                  <tr>
                    <th scope="row"><strong>Is Magnetic:</strong></th>
                    <td><strong>{{material.magnetic_data.is_magnetic == 'true'? 'Yes' : 'No'}}</strong></td>
                  </tr>
                  <tr>
                    <th scope="row"><strong>Magnetic Ordering</strong></th>
                    <td> <strong>{{material.magnetic_data.ordering}}</strong></td>
                   
                  </tr>
                  <tr>
                    <th scope="row"><strong>Total Magnetization:</strong></th>
                    <td><strong>{{formatNumber(material.magnetic_data.total_magnetization)}}</strong></td>
                  </tr>
                  
                  <tr>
                    <th scope="row"><strong>Total Magnetization Normalized Volume</strong></th>
                    <td><strong>{{formatNumber(material.magnetic_data.total_magnetization_normalized_vol)}}</strong></td>
                  </tr>
                  <tr>
                    <th scope="row"><strong>Total Magnetization Normalized Forula Units</strong></th>
                    <td><strong>{{formatNumber(material.magnetic_data.total_magnetization_normalized_formula_units)}}</strong></td>
                  </tr>
                  <tr>
                    <th scope="row"><strong>Number of Magnetic sites</strong></th>
                    <td><strong>{{material.magnetic_data.num_magnetic_sites}}</strong></td>
                  </tr>
                  <tr>
                    <th scope="row"><strong>Number of Unique Magnetic sites</strong></th>
                    <td><strong>{{material.magnetic_data.num_unique_magnetic_sites}}</strong></td>
                  </tr>
                  <tr>
                    <th scope="row"><strong>types of Magnetic Species </strong></th>
                    <td><strong>{{material.magnetic_data.types_of_magnetic_species}}</strong></td>
                  </tr>
                </tbody>
              </table>
            </slot>
          </div>
          <slot name="raw-content"></slot>
        </div>
      </div>
      
      <div class="col-xl-8 col-lg-7 col-md-6">
        <div class="row">
          <div class="col-xl-6 col-lg-7 col-md-8" v-if="material.symmetry">
            <div class="card">
              <div class="card-header">
                <slot name="header">
                  <h3 class="card-title justify-center">Symmetry</h3>
                  <v-divider></v-divider>
                </slot>
              </div>
              <div class="card-body">
                <slot>
                  <table class="table card-category">
                    <tbody>
                      <tr v-for="(symmetry, index) in material.symmetry" :key="index">
                        <th scope="row"><strong>{{formatTitle(index)}}</strong></th>
                        <td><strong>{{symmetry}}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </slot>
              </div>
              <slot name="raw-content"></slot>
            </div>
          </div>
          <div class="col-xl-6 col-lg-7 col-md-8" v-if="material.lattice">
            <div class="card">
              <div class="card-header">
                <slot name="header">
                  <h3 class="card-title justify-center">Lattice</h3>
                  <v-divider></v-divider>
                </slot>
              </div>
              <div class="card-body">
                <slot>
                  <table class="table card-category">
                    <tbody>
                      <tr>
                        <th scope="row"><strong>a: </strong></th>
                        <td><strong>{{material.lattice.a}}</strong></td>
                      </tr>
                      <tr>
                        <th scope="row"><strong>b: </strong></th>
                        <td><strong>{{material.lattice.b}}</strong></td>
                      </tr>
                      <tr>
                        <th scope="row"><strong>c:</strong></th>
                        <td><strong>{{material.lattice.c}}</strong></td>
                      </tr>
                      <tr>
                        <th scope="row"><strong>alpha:</strong></th>
                        <td><strong>{{material.lattice.alpha}}</strong></td>
                      </tr>
                      <tr>
                        <th scope="row"><strong>beta:</strong></th>
                        <td><strong>{{material.lattice.beta}}</strong></td>
                      </tr>
                      <tr>
                        <th scope="row"><strong>gamma:</strong></th>
                        <td><strong>{{material.lattice.gamma}}</strong></td>
                      </tr>
                      <tr>
                        <th scope="row"><strong>volume:</strong></th>
                        <td><strong>{{material.lattice.volume}}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </slot>
              </div>
              <slot name="raw-content"></slot>
            </div>
          </div>
          <div class="col-xl-6 col-lg-7 col-md-8" v-if="material.thermodynamic_data">
            <div class="card">
              <div class="card-header">
                <slot name="header">
                  <h3 class="card-title justify-center">Thermo Dynamic Properties</h3>
                  <v-divider></v-divider>
                </slot>
              </div>
              <div class="card-body">
                <slot>
                  <table class="table card-category">
                    <tbody>
                      <tr>
                        <th scope="row"><strong>Is Stable:</strong></th>
                        <td><strong>{{material.thermodynamic_data.is_stable == 'true' ? 'Yes' : 'No'}}</strong></td>
                      </tr>
                      <tr>
                        <th scope="row"><strong>Energy Above Hull</strong></th>
                        <td> <strong>{{formatNumber(material.thermodynamic_data.energy_above_hull)}}</strong></td>
                       
                      </tr>
                      <tr>
                        <th scope="row"><strong>Predicted Formation Energy:</strong></th>
                        <td><strong>{{formatNumber(material.thermodynamic_data.predicted_formation_energy)}}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </slot>
              </div>
              <slot name="raw-content"></slot>
            </div>
          </div>
          <div class="col-xl-6 col-lg-7 col-md-8" v-if="material.electronic_data">
            <div class="card">
              <div class="card-header">
                <slot name="header">
                  <h3 class="card-title justify-center">Electronic Properties</h3>
                  <v-divider></v-divider>
                </slot>
              </div>
              <div class="card-body">
                <slot>
                  <table class="table card-category">
                    <tbody>
                      <tr>
                        <th scope="row"><strong>Band Gap: </strong></th>
                       
                        <td><strong>{{formatNumber(material.electronic_data.band_gap)}}</strong></td>
                      </tr>
                      <tr>
                        <th scope="row"><strong>Direct Gap</strong></th>
                        <td><strong>{{material.electronic_data.direct_gap == 'true' ? 'Yes' : 'No'}}</strong></td>
                       
                      </tr>
                      <tr>
                        <th scope="row"><strong>Is Metallic:</strong></th>
                        <td><strong>{{material.electronic_data.is_metallic == 'true' ? 'Yes' : 'No'}}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </slot>
              </div>
              <slot name="raw-content"></slot>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import toastr from 'toastr';

export default {
  data() {
    return {
      material: [],
      loading:false,
    }
  },
  mounted() {
    this.getMaterial()
  },
  methods: {
    getMaterial() {
            let id = this.$route.params.id;
            this.axios.get(`/view/${id}`)
                .then((response) => {
                    this.material = response.data.payload
                }).catch((error) => {
                  console.log(error.response.status);
                  helper.showErrorMsg(error);
                  if(error.response.status === 404){
                    this.$router.push('/')
                  }
            })
    },
    formatNumber(number){
        if(typeof number === "number"){
          return number.toFixed(2);
        }
        return number;
    },
    async downloadJson() {
      try {
        // Make an HTTP request to fetch the JSON data from the API
        let id = this.$route.params.id;
        const response = await this.axios.get(`/download/${id}`);
        const json = response.data;

        // Convert JSON data to a Blob
        const jsonBlob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });

        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(jsonBlob);
        downloadLink.download = `mp-${id}-data.json`; // Set the desired file name

        // Trigger a click event to download the file
        downloadLink.click();
      } catch (error) {
        console.error('Error downloading JSON:', error);
      }
    },
    formatTitle(text){
      return text.toUpperCase().replace(/_/g,' ')
    }
  },
};
</script>
<style></style>
