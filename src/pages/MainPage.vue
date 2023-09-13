<template>
  <div class="main-page">
    <button
      class="btn btn--outline"
      @click="openEmployeePopup"
    >
      <img src="/static/icons/add.svg" alt="icon"/>
      <span>Добавить</span>
    </button>
    <EmployeeTable/>
    <BasePopup
      v-model="employeePopup"
      title="Добавить пользователя"
      @close="closeEmployeePopup()"
    >
      <AddEmployeeForm
        @close="closeEmployeePopup()"
        @alert="showAlert"
      />
    </BasePopup>
    <BaseAlert
      v-model="alert"
      v-bind="alertData"
      @hide="hideAlert"
    />
  </div>
</template>

<script>
import BaseAlert from '../components/BaseAlert.vue'
import AddEmployeeForm from '../components/AddEmployeeForm.vue'
import EmployeeTable from '../components/EmployeeTable.vue'
import BasePopup from '../components/BasePopup.vue'

export default {
  name: 'MainPage',
  components: {
    BaseAlert,
    AddEmployeeForm,
    EmployeeTable,
    BasePopup
  },
  data () {
    return {
      employeePopup: false,
      alert: false,
      alertData: {
        message: null,
        type: null
      }
    }
  },
  methods: {
    openEmployeePopup () {
      this.employeePopup = true
    },
    closeEmployeePopup () {
      this.employeePopup = false
    },
    showAlert (alert) {
      this.alert = true
      this.alertData = {
        message: alert.message,
        type: alert.type
      }
      setTimeout(() => {
        this.alert = false
      }, 5000)
    },
    hideAlert () {
      this.alert = false
      this.alertData = {
        message: null,
        type: null
      }
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/variables";

.main-page {
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: start;
}

.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity .5s ease;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }
}

.btn {
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-items: center;
  &--outline {
    border: 1px solid $btn-outline;
    background: $white;
    color: $black;
    padding: 12px 20px;
    font-weight: 600;
    &:hover,
    &:active {
      background: $btn-outline-hover;
      transition: all 0.3s ease;
    }
  }
  &--primary {
    border: none;
    background: $positive;
    color: $white;
    padding: 12px 20px;
    font-weight: 600;
    align-self: end;
    &:hover {
      background: $positive-hover;
      transition: all 0.3s ease;
    }
  }
  &--flat {
    padding: 10px;
    background: transparent;
    border: none;
  }
  &--square {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
}
</style>
