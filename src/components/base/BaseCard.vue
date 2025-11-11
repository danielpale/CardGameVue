<script setup>
import { computed, inject, useTemplateRef, watch } from 'vue'
import { gsap } from 'gsap'

const POSITIONS = {
  back: { row: 0, col: 0 },

  'yellow-1': { row: 1, col: 0, offsetX: 0, offsetY: 0 },
  'yellow-2': { row: 1, col: 1, offsetX: 0, offsetY: 0 },
  'yellow-3': { row: 1, col: 2, offsetX: 3, offsetY: 0 },
  'yellow-4': { row: 1, col: 3, offsetX: 5, offsetY: 0 },
  'yellow-5': { row: 1, col: 4, offsetX: 8, offsetY: 0 },
  'yellow-6': { row: 1, col: 5, offsetX: 10, offsetY: 0 },
  'yellow-7': { row: 1, col: 6, offsetX: 13, offsetY: 0 },
  'yellow-8': { row: 1, col: 7, offsetX: 18, offsetY: 0 },
  'yellow-9': { row: 1, col: 8, offsetX: 20, offsetY: 0 },
  'yellow-0': { row: 1, col: 9, offsetX: 23, offsetY: 0 },
  'yellow-plus-two': { row: 1, col: 10, offsetX: 25, offsetY: 0 },
  'yellow-skip': { row: 1, col: 11, offsetX: 28, offsetY: 0 },

  'yellow-reverse': { row: 2, col: 0, offsetX: 0, offsetY: 3 },
  'red-1': { row: 2, col: 1, offsetX: 0, offsetY: 3 },
  'red-2': { row: 2, col: 2, offsetX: 3, offsetY: 3 },
  'red-3': { row: 2, col: 3, offsetX: 5, offsetY: 3 },
  'red-4': { row: 2, col: 4, offsetX: 8, offsetY: 3 },
  'red-5': { row: 2, col: 5, offsetX: 10, offsetY: 3 },
  'red-6': { row: 2, col: 6, offsetX: 13, offsetY: 3 },
  'red-7': { row: 2, col: 7, offsetX: 18, offsetY: 3 },
  'red-8': { row: 2, col: 8, offsetX: 20, offsetY: 3 },
  'red-9': { row: 2, col: 9, offsetX: 23, offsetY: 3 },
  'red-0': { row: 2, col: 10, offsetX: 25, offsetY: 3 },
  'red-plus-two': { row: 2, col: 11, offsetX: 28, offsetY: 3 },

  'red-skip': { row: 3, col: 0, offsetX: 0, offsetY: 6 },
  'red-reverse': { row: 3, col: 1, offsetX: 0, offsetY: 6 },
  'blue-1': { row: 3, col: 2, offsetX: 3, offsetY: 6 },
  'blue-2': { row: 3, col: 3, offsetX: 5, offsetY: 6 },
  'blue-3': { row: 3, col: 4, offsetX: 8, offsetY: 6 },
  'blue-4': { row: 3, col: 5, offsetX: 10, offsetY: 6 },
  'blue-5': { row: 3, col: 6, offsetX: 13, offsetY: 6 },
  'blue-6': { row: 3, col: 7, offsetX: 18, offsetY: 6 },
  'blue-7': { row: 3, col: 8, offsetX: 20, offsetY: 6 },
  'blue-8': { row: 3, col: 9, offsetX: 23, offsetY: 6 },
  'blue-9': { row: 3, col: 10, offsetX: 25, offsetY: 6 },
  'blue-0': { row: 3, col: 11, offsetX: 28, offsetY: 6 },

  'blue-plus-two': { row: 4, col: 0, offsetX: 0, offsetY: 9 },
  'blue-skip': { row: 4, col: 1, offsetX: 0, offsetY: 9 },
  'blue-reverse': { row: 4, col: 2, offsetX: 3, offsetY: 9 },
  'green-1': { row: 4, col: 3, offsetX: 5, offsetY: 9 },
  'green-2': { row: 4, col: 4, offsetX: 8, offsetY: 9 },
  'green-3': { row: 4, col: 5, offsetX: 10, offsetY: 9 },
  'green-4': { row: 4, col: 6, offsetX: 13, offsetY: 9 },
  'green-5': { row: 4, col: 7, offsetX: 18, offsetY: 9 },
  'green-6': { row: 4, col: 8, offsetX: 20, offsetY: 9 },
  'green-7': { row: 4, col: 9, offsetX: 23, offsetY: 9 },
  'green-8': { row: 4, col: 10, offsetX: 25, offsetY: 9 },
  'green-9': { row: 4, col: 11, offsetX: 28, offsetY: 9 },

  'green-0': { row: 5, col: 0, offsetX: 0, offsetY: 12 },
  'green-plus-two': { row: 5, col: 1, offsetX: 0, offsetY: 12 },
  'green-skip': { row: 5, col: 2, offsetX: 3, offsetY: 12 },
  'green-reverse': { row: 5, col: 3, offsetX: 5, offsetY: 12 },
}
const HEIGHT = 256
const WIDTH = 165
const MARGIN = 2

const props = defineProps({ card: { type: String, default: 'back' } })
const model = defineModel({ type: [Boolean, Array, String], default: false })

let tween
const templateRef = useTemplateRef('baseCard')
const containerTemplateRef = useTemplateRef('baseCardContainer')
const insideDeck = inject('insideDeck', false)

const position = computed(() => getCardPosition(props.card))
const selected = computed(() => {
  if (typeof model.value === 'boolean') return model.value
  if (typeof model.value === 'string' || model.value === null) return model.value === props.card
  if (Array.isArray(model.value)) return model.value.includes(props.card)
  return model.value
})

watch(selected, (value) => {
  if (!insideDeck) return
  if (value) {
    gsap.to(containerTemplateRef.value, { y: -HEIGHT / 2, duration: 0.5, ease: 'power1.inOut' })
  } else {
    gsap.to(containerTemplateRef.value, { y: 0, duration: 0.5, ease: 'power1.inOut' })
  }
})

// Card Functions
function getCardPosition(card) {
  const { row, col, offsetX, offsetY } = POSITIONS[card]
  return `-${col * WIDTH + (col !== 0 ? MARGIN : 0) + offsetX}px -${row * HEIGHT + (row !== 0 ? MARGIN : 0) + offsetY}px`
}
function flipCard() {
  const rotationY = !tween?.vars?.rotationY ? 180 : 0
  tween = gsap.to(templateRef.value, { rotationY, duration: 0.5, ease: 'power1.inOut' })
  return rotationY === 180 // Flipped
}
function selectCard() {
  if (typeof model.value === 'boolean') model.value = true
  if (typeof model.value === 'string' || model.value === null) model.value = props.card
  if (Array.isArray(model.value)) {
    if (!model.value.includes(props.card)) model.value.push(props.card)
  }
}
function deselectCard() {
  if (typeof model.value === 'boolean') model.value = false
  if (typeof model.value === 'string' || model.value === null) model.value = null
  if (Array.isArray(model.value)) {
    const index = model.value.indexOf(props.card)
    model.value.splice(index, 1)
  }
}
function getCard() {
  return props.card
}

// Event Handlers
let mouseEnterTween
function handleMouseEnter() {
  mouseEnterTween = gsap.to(containerTemplateRef.value, {
    '--border-opacity': 0.4,
    duration: 0.12,
    ease: 'power1.inOut',
  })
  if (!insideDeck) return
  gsap.to(containerTemplateRef.value, {
    '--margin-right': 116,
    duration: 0.36,
    ease: 'power1.inOut',
  })
}
function handleMouseLeave() {
  mouseEnterTween.revert()
  if (!insideDeck) return
  gsap.to(containerTemplateRef.value, {
    '--margin-right': 0,
    duration: 0.36,
    ease: 'power1.inOut',
  })
}

defineExpose({ flipCard, selectCard, deselectCard, getCard, card: props.card, selected: selected })
</script>

<template>
  <div
    class="base-card__container"
    ref="baseCardContainer"
    :class="{ 'base-card--selected': selected }"
    :style="{ height: `${HEIGHT}px`, width: `${WIDTH}px` }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="selected ? deselectCard() : selectCard()"
  >
    <div ref="baseCard" class="base-card">
      <span class="base-card__front" :style="{ backgroundPosition: position }"></span>
      <span class="base-card__back"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;

  &__container {
    --border-opacity: 0;
    --margin-right: 0px;
    perspective: 1000px;
    cursor: pointer;
    flex-shrink: 0;
    margin-right: var(--margin-right);

    &::before {
      --border-offset: 4px;
      content: '';
      position: absolute;
      top: calc(0px - var(--border-offset));
      left: calc(0px - var(--border-offset));
      width: calc(100% + (var(--border-offset) * 2));
      height: calc(100% + (var(--border-offset) * 2));
      border: 4px solid #f9db27;
      border-radius: calc(20px + (var(--border-offset) / 2));
      opacity: var(--border-opacity);
    }

    // &:hover::before {
    //   opacity: 0.4;
    // }
  }

  &__front,
  &__back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 20px;
    border: 1px solid black;
    background-image: url('@/assets/images/uno-spritesheet.png');
  }

  &__back {
    transform: rotateY(180deg);
    background-position: 0 0;
  }
}

.base-card--selected.base-card__container {
  --border-opacity: 1 !important;
}
</style>
