<template>
  <div class="form">
    <div class="form__input-wrap">
      <label>Имя</label>
      <input
        v-model="formData.name"
        placeholder="Введите имя сотрудника"
        type="text"
      >
    </div>
    <div class="form__input-wrap">
      <label>Телефон</label>
      <input
        ref="input"
        v-model="formData.phone"
        v-mask="'+7 (___) ___ __ __'"
        placeholder="Введите телефон"
        id="phone"
      >
    </div>
    <div class="form__input-wrap">
      <label>Начальник</label>
      <select v-model="formData.parent">
        <option
          :value="null"
          disabled
          selected
        >
          Выберите начальника (необязательно)
        </option>
        <option
          v-for="(employee,i) in employeeOptions"
          :key="i"
          :label="employee.name"
          :value="employee.id"
        />
      </select>
    </div>
    <button
      class="btn btn--primary"
      @click="add()"
    >
      Сохранить
    </button>
  </div>
</template>

<script>
export default {
  name: 'AddEmployeeForm',
  computed: {
    id () {
      // emulation of autoIncrement
      return this.employeeOptions.length + 1
    }
  },
  data () {
    return {
      set: [],
      employeeOptions: JSON.parse(localStorage.getItem('employee')),
      formData: {
        id: null,
        name: null,
        phone: null,
        parent: null
      },
      alertData: {
        message: null,
        type: null
      }
    }
  },
  methods: {
    add () {
      if (!this.validateForm()) return
      this.formData.id = this.id
      this.formData.phone = this.$refs.input.clean
      this.employeeOptions.push(this.formData)
      localStorage.setItem('employee', JSON.stringify(this.employeeOptions))
      this.$emit('update')
      this.alertSuccess('Сотрудник успешно добавлен!')
      this.clearFormData()
      this.closePopup()
    },
    validateForm () {
      if (!this.formData.name) {
        return this.alertError('Заполните поле "Имя"')
      }
      if (!this.formData.phone) {
        return this.alertError('Заполните поле "Телефон"')
      }
      if (this.$refs.input.clean.length !== 11) {
        return this.alertError('В номере телефона должно быть 11 цифр')
      }
      return true
    },
    clearFormData () {
      this.formData = {
        id: null,
        name: null,
        phone: null,
        parent: null
      }
    },
    closePopup () {
      this.$emit('close')
    },
    alertError (message) {
      this.alertData = {
        message: message,
        type: 'negative'
      }
      this.$emit('alert', this.alertData)
    },
    alertSuccess (message) {
      this.alertData = {
        message: message,
        type: 'positive'
      }
      this.$emit('alert', this.alertData)
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/variables";

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  &__input-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
}

input,
select {
  height: 40px;
  border-radius: 9px;
  background: $btn-outline-hover;
  border: 1px solid $btn-outline;
  color: $grey-1;
  transition: all 0.3s ease;
  padding: 0 10px;
  &:focus,
  &:active {
    outline: 1px solid $btn-outline-hover;
    transition: all 0.3s ease;
  }
  &::placeholder {
    color: $grey-2;
  }
}
</style>
