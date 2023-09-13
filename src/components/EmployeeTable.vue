<template>
  <div class="table">
    <div class="table__header">
      <div
        v-for="(column, i) in columns"
        :key="i"
        class="table__header__column"
        @click="sort(column.name)"
      >
        {{ column.label }}
        <img
          src="/static/icons/sort.svg"
          :style="sortOrderAsc?'transform: rotate(180deg)':''"
          alt="icon"
          v-if="sortColumn===column.name"
        />
      </div>
    </div>
    <TreeItem
      v-for="(child, i) in employees"
      :key="i"
      :sort-column="sortColumn"
      :sort-order-asc="sortOrderAsc"
      :item="child"
    />
  </div>
</template>

<script>
import {useEmployeesStore} from '../stores/employees'
import TreeItem from './treeItem.vue'

export default {
  name: 'EmployeeTable',
  components: {
    TreeItem
  },
  computed: {
    employees () {
      return useEmployeesStore().getNestedList()
    }
  },
  data () {
    return {
      sortColumn: 'name',
      sortOrderAsc: true,
      columns: [
        {
          name: 'name',
          label: 'Имя'
        },
        {
          name: 'phone',
          label: 'Телефон'
        }
      ]
    }
  },
  methods: {
    sort (columnName) {
      this.sortColumn = columnName
      this.sortOrderAsc = !this.sortOrderAsc
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/variables";

.table {
  box-shadow: inset 0 0 0 1px $btn-outline;
  border-radius: 20px;
  overflow: hidden;
  &__header {
    display: flex;
    height: 38px;
    background: $btn-outline-hover;
    border: 1px solid $btn-outline;
    &__column {
      height: 100%;
      width: 200px;
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: start;
      padding: 0 20px;
      color: $dark;
      font-weight: 600;
    }
  }
}
</style>
