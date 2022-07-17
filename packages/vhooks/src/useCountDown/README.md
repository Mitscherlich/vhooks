# useCountDown

A hook for managing countdown.

## API

```ts
interface CountDownOptions {
  targetDate?: TDate
  interval?: number
  onEnd?: () => void
}

function useCountDown(options?: CountDownOptions): {
  timeLeft: DeepReadonly<Ref<number>>
  formattedRes: DeepReadonly<Ref<{
    readonly days: number
    readonly hours: number
    readonly minutes: number
    readonly seconds: number
    readonly milliseconds: number
  }>>
}
```
