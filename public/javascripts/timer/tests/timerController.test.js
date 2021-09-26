import TimerController from '../timerController'

const timerController = new TimerController
const timerInitialHours = '00'
const timerInitialMinutes = '00'
const timerInitialSeconds = '00'
const timerCustomHours = '01'
const timerCustomMinutes = '30'
const timerCustomSeconds = '45'

test('timer must be clean when initialized', () => {
  expect(timerController.timer).toEqual({
    initialHours: timerInitialHours,
    initialMinutes: timerInitialMinutes,
    initialSeconds: timerInitialSeconds,
    currentHours: parseInt(timerInitialHours),
    currentMinutes: parseInt(timerInitialMinutes),
    currentSeconds: parseInt(timerInitialSeconds),
    finalTime: timerController.timer.finalTime
  });
})

test('timer must be paused when initialized', () => {
  expect(timerController.isPlaying).toBeFalsy()
})

test('current hours when timer is clean', () => {
  expect(timerController.currentHours).toBe(parseInt(timerInitialHours))
})

test('current minutes when timer is clean', () => {
  expect(timerController.currentMinutes).toBe(parseInt(timerInitialMinutes))
})

test('current seconds when timer is clean', () => {
  expect(timerController.currentSeconds).toBe(parseInt(timerInitialSeconds))
})

test('timer selection', () => {
  timerController.selectTimer(timerCustomHours, timerCustomMinutes, timerCustomSeconds)
  expect(timerController.timer).toEqual({
    initialHours: timerCustomHours,
    initialMinutes: timerCustomMinutes,
    initialSeconds: timerCustomSeconds,
    currentHours: parseInt(timerCustomHours),
    currentMinutes: parseInt(timerCustomMinutes),
    currentSeconds: parseInt(timerCustomSeconds),
    finalTime: timerController.timer.finalTime
  });
})

test('play timer', () => {
  timerController.toggleTimerMode(true)
  expect(timerController.isPlaying).toBeTruthy()
})

test('pause timer', () => {
  timerController.toggleTimerMode(false)
  expect(timerController.isPlaying).toBeFalsy()
})

/**
 * For testing the timer reload, we need to work
 * with Jest fake timers, because assynchronous functions
 * such as setTimeout are not executed by default, so we have 
 * to advance the time manualy through advanceTimersByTime.
 */
test('reload timer', () => {
  const initialTimer = { ...timerController.timer }
  timerController._playTimer()
  jest.useFakeTimers()

  setTimeout(() => {
    timerController.updateTimer()
    expect(timerController.timer).not.toEqual(initialTimer)

    timerController.reloadTimer()
    expect(timerController.timer).toEqual({ ...initialTimer, finalTime: timerController.timer.finalTime })
  }, 1000)

  jest.advanceTimersByTime(1000)
  jest.useRealTimers()
})

test('getting time formatted', () => {
  expect(timerController.getTimeFormatted()).toBe(`${timerCustomHours}:${timerCustomMinutes}:${timerCustomSeconds}`)
})

test('when time is not over', () => {
  timerController.selectTimer(timerInitialHours, timerInitialMinutes, '01')
  expect(timerController.timeIsOver()).toBeFalsy()
})

/**
 * For testing when time is over, we need to work
 * with Jest fake timers, because assynchronous functions
 * such as setTimeout are not executed by default, so we have 
 * to advance the time manualy through advanceTimersByTime.
 */
test('when time is over', () => {
  timerController.selectTimer(timerInitialHours, timerInitialMinutes, '01')
  timerController._playTimer()
  jest.useFakeTimers()

  setTimeout(() => {
    timerController.updateTimer()
    expect(timerController.timeIsOver()).toBeTruthy()
  }, 1000)

  jest.advanceTimersByTime(1000)
  jest.useRealTimers()
})