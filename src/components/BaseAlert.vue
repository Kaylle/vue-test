<template>
  <transition name="fade">
    <div :class="`alert alert--${type}`" v-if="value">
      <div class="alert__text">
        <p>{{ message }}</p>
        <button
          class="btn btn--flat"
          @click="hideAlert()"
        >
          <img src="/static/icons/close-2.svg" alt="close"/>
        </button>
      </div>
      <div class="alert__progress"/>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BaseAlert',
  props: {
    message: {
      type: String
    },
    type: {
      type: String,
      default: 'negative'
    },
    value: {
      type: Boolean
    }
  },
  methods: {
    hideAlert () {
      this.$emit('hide')
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/variables";

.alert {
  color: $white;
  border-radius: 9px;
  position: fixed;
  bottom: 25px;
  right: 25px;
  overflow: hidden;
  &__text {
    padding: 0 20px;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  &__progress {
    width: 100%;
    height: 4px;
    animation: progressAnimation 5s linear;
    &--positive {
      background: $positive-hover;
    }
    &--negative {
      background: $negative-hover;
    }
  }
  &--positive {
    background: $positive;
    & .alert__progress {
      background: $positive-hover;
    }
  }
  &--negative {
    background: $negative;
    & .alert__progress {
      background: $negative-hover;
    }
  }
}

@keyframes progressAnimation {
  0%   { width: 0;}
  100% { width: 100%;}
}
</style>
