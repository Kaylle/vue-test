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
      v-for="(child, i) in tableData"
      :key="i"
      :sort-column="sortColumn"
      :sort-order-asc="sortOrderAsc"
      :item="child"
    />
  </div>
</template>

<script>
import TreeItem from './treeItem.vue'

export default {
  name: 'EmployeeTable',
  components: {
    TreeItem
  },
  data () {
    return {
      tableData: null,
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
    },
    getNestedList () {
      const data = localStorage.getItem('employee')
      const array = JSON.parse(data)
      const cache = new Map()
      const getChildrenArray = (key) => cache.get(key) || cache.set(key, []).get(key)
      const maker = (item, getChildrenFor) => {
        return {
          ...item,
          children: getChildrenFor(item.id)
        }
      }
      for (let item of array) {
        getChildrenArray(item.parent).push(
          maker(item, getChildrenArray)
        )
      }
      this.tableData = cache.get(null)
    }
  },
  created () {
    this.getNestedList()
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
