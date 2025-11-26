<script setup>
import { computed, inject, useTemplateRef, watch } from 'vue'
import { gsap } from 'gsap'

import { POSITIONS, HEIGHT, WIDTH } from '@/constants/card'

const SPRITE_WIDTH = 2048
const SPRITE_HEIGHT = 2048

const props = defineProps({
  id: String,
  card: { type: String, default: 'back' },
  height: { type: Number, default: HEIGHT },
  width: { type: Number, default: WIDTH },
  disabled: Boolean,
})
const model = defineModel({ type: [Boolean, Array, String], default: false })

let tween
const templateRef = useTemplateRef('baseCard')
const containerTemplateRef = useTemplateRef('baseCardContainer')
const insideDeck = inject('insideDeck', false)
const overlap = inject('overlap', 0)

const _id = computed(() => {
  if (props.id === undefined) return props.card
  return props.id
})
const style = computed(() => getCardStyle(props.card))
const selected = computed(() => {
  if (props.disabled) return false
  if (typeof model.value === 'boolean') return model.value
  if (typeof model.value === 'string' || model.value === null) return model.value === _id.value
  if (Array.isArray(model.value)) return model.value.includes(_id.value)
  return model.value
})

watch(selected, (value) => {
  if (!insideDeck) return
  if (value) {
    gsap.to(containerTemplateRef.value, {
      y: -props.height / 2,
      duration: 0.5,
      ease: 'power1.inOut',
    })
  } else {
    gsap.to(containerTemplateRef.value, { y: 0, duration: 0.5, ease: 'power1.inOut' })
  }
})

// Card Functions
function getCardStyle(card) {
  const style = { backgroundSize: '', backgroundPosition: '' }
  const { x, y, w, h } = POSITIONS[card] ?? {}
  const scaleX = props.width / w
  const scaleY = props.height / h
  style.backgroundSize = `${SPRITE_WIDTH * scaleX}px ${SPRITE_HEIGHT * scaleY}px`
  style.backgroundPosition = `-${x * scaleX}px -${y * scaleY}px`
  return style
}
function flipCard() {
  const rotationY = !tween?.vars?.rotationY ? 180 : 0
  tween = gsap.to(templateRef.value, { rotationY, duration: 0.5, ease: 'power1.inOut' })
  return rotationY === 180 // Flipped
}
function selectCard() {
  if (typeof model.value === 'boolean') model.value = true
  if (typeof model.value === 'string' || model.value === null) model.value = _id.value
  if (Array.isArray(model.value)) {
    if (!model.value.includes(_id.value)) model.value.push(_id.value)
  }
}
function deselectCard() {
  if (typeof model.value === 'boolean') model.value = false
  if (typeof model.value === 'string' || model.value === null) model.value = null
  if (Array.isArray(model.value)) {
    const index = model.value.indexOf(_id.value)
    model.value.splice(index, 1)
  }
}
function getCard() {
  return { card: props.card, id: _id.value }
}

// Event Handlers
function handleCardClick() {
  if (props.disabled) return
  selected.value ? deselectCard() : selectCard()
}
let borderOpacityTween
function handleMouseEnter() {
  if (props.disabled) return
  borderOpacityTween = gsap.to(containerTemplateRef.value, {
    '--border-opacity': 0.4,
    duration: 0.12,
    ease: 'power1.inOut',
  })
  if (!insideDeck) return
  gsap.to(containerTemplateRef.value, {
    '--margin-right': overlap.value * 1.1,
    duration: 0.36,
    ease: 'power1.inOut',
  })
}
function handleMouseLeave() {
  if (props.disabled) return
  borderOpacityTween.revert()
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
    :style="{ height: `${props.height}px`, width: `${props.width}px` }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleCardClick"
  >
    <div ref="baseCard" class="base-card">
      <span class="base-card__front" :style="style"></span>
      <span class="base-card__back" :style="{ backgroundSize: style.backgroundSize }"></span>
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
  }

  &__front,
  &__back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 20px;
    // border: 1px solid black;
    background-image: url('@/assets/images/uno-spritesheet.png');
  }

  &__back {
    transform: rotateY(180deg);
    background-position: 0 0;
  }
}

.base-card--selected.base-card__container {
  --border-opacity: 1 !important;
  z-index: 1;
}
</style>
