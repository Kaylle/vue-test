<template>
  <transition name="fade">
    <div
      v-if="value"
      class="popup-backdoor"
      @click.self="closePopup()"
    >
      <div class="popup-card">
        <div class="popup-card__header">
          <h3>{{ title }}</h3>
          <button
            class="btn btn--outline btn--square"
            @click="closePopup()"
          >
            <img src="/static/icons/close.svg" alt="icon"/>
          </button>
        </div>
        <slot/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BasePopup',
  props: {
    title: {
      type: String
    },
    value: {
      type: Boolean
    }
  },
  methods: {
    closePopup () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/variables";

.popup-backdoor {
  background: $backdoor;
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
}

.popup-card {
  width: 400px;
  background: $white;
  padding: 25px;
  border-radius: 20px;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
