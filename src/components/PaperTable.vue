<template>
  <table class="table" :class="tableClass">
    <thead>
      <slot name="columns">
        <th
        v-for="column in columns"
        :key="column"
      >
      {{ column }}
      </th>
      </slot>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td v-for="(column, index) in columns" :key="index">
            {{ item[column] }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: "paper-table",
  props: {
    columns: Array,
    data: Array,
    type: {
      type: String, // striped | hover
      default: "striped",
    },
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      sortBy: 'id', // Current sorting column
      sortOrder: 'desc', // Default sorting order
      col: 'id', // Define the 'column' property here
    };
  },
  computed: {
    tableClass() {
      return `table-${this.type}`;
    },
  },
};
</script>
<style>
.sort-indicator {
  font-size: 0.8rem; /* Adjust the font size as needed */
  margin-left: 4px; /* Adjust the margin to position the indicator appropriately */
  vertical-align: middle; /* Vertically align the indicator with the header text */
  color: #555; /* Set the color of the indicator */
}

/* Style for the sorted column header */
th.sorted {
  background-color: #f6f0f0; /* Add a background color to indicate the sorted column */
}
</style>
