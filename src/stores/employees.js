import { defineStore } from 'pinia'
export const useEmployeesStore = defineStore('employees', {
  state: () => ({
    items: [
      {
        id: 1,
        name: 'Марина',
        phone: 1116396833,
        parent: null
      },
      {
        id: 2,
        name: 'Пётр',
        phone: 9059720079,
        parent: null
      },
      {
        id: 3,
        name: 'Алексей',
        phone: 4735942684,
        parent: 2
      },
      {
        id: 4,
        name: 'Иван',
        phone: 9009792151,
        parent: 2
      },
      {
        id: 5,
        name: 'Борис',
        phone: 1183291175,
        parent: 4
      },
      {
        id: 6,
        name: 'Екатерина',
        phone: 9075244624,
        parent: 4
      },
      {
        id: 7,
        name: 'Валерия',
        phone: 3343658860,
        parent: null
      }
    ]
  }),
  getters: {
    list: (state) => state.items
  },
  actions: {
    addEmployee (item) {
      this.items.push(item)
      localStorage.setItem('employee', JSON.stringify(this.items))
    },
    getEmployees () {
      const data = localStorage.getItem('employee')
      return data ? JSON.parse(data) : this.items
    },
    getNestedList () {
      const array = this.getEmployees()
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
      return cache.get(null)
    }
  }
})
