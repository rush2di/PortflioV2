import ScrollMagic from "ScrollMagic"

const controller = new ScrollMagic.Controller()

export const scene = (trigger, offset, callback) => {
  new ScrollMagic.Scene({
    triggerElement: trigger,
    duration: 0,
    triggerHook: 0.85,
    offset: offset,
  })
    .on("enter", callback)
    .addTo(controller)
}
