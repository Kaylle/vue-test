<template>
  <div>
    <div class="table__row" v-if="item.name">
      <button
        v-if="haveChild"
        @click="toggle"
        class="btn btn--flat"
      >
        <img
          :src="`/static/icons/${isOpen?'remove':'add'}.svg`"
          alt="icon"
        />
      </button>
      <div class="table__cell--body">
        {{ item.name }}
      </div>
      <div class="table__cell--body" style="width: 300px">
        {{ formattedPhone(item.phone) }}
      </div>
    </div>
    <div v-show="isOpen" v-if="haveChild">
      <tree-item
        class="table__wrap"
        v-for="(child, i) in sortedEmployees"
        :key="i"
        :item="child"
        :sort-column="sortColumn"
        :sort-order-asc="sortOrderAsc"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'treeItem',
  props: {
    item: {
      type: Object
    },
    sortColumn: {
      type: String,
      default: 'name'
    },
    sortOrderAsc: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    haveChild () {
      return this.item.children && this.item.children.length
    },
    sortedEmployees () {
      if (this.item.children) {
        let a = this.item.children
        return a.sort((a, b) => {
          if (a[this.sortColumn] < b[this.sortColumn]) {
            return this.sortOrderAsc ? -1 : 1
          }
          if (a[this.sortColumn] > b[this.sortColumn]) {
            return this.sortOrderAsc ? 1 : -1
          }
          return 0
        })
      } else return null
    }
  },
  data () {
    return {
      isOpen: true
    }
  },
  methods: {
    toggle () {
      if (this.haveChild) {
        this.isOpen = !this.isOpen
      }
    },
    formattedPhone (phone) {
      let result = phone.toString()
      let x = result.replace(/\D/g, '').match(/(\d{3})(\d{3})(\d{2})(\d{2})/)
      result = '+7 (' + x[1] + ') ' + x[2] + '-' + x[3] + '-' + x[4]
      return result
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/variables";

.table {
  &__wrap {
    padding-left: 50px;
  }
  &__row {
    display: flex;
    height: 50px;
    border-bottom: 1px solid $btn-outline;
    transition: all 0.3s ease;
    &:hover {
      background: $btn-outline-hover;
      transition: all 0.3s ease;
    }
  }
  &__cell--body {
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 0 20px;
  }
}

.test {
  width: 50px;
}
</style>
