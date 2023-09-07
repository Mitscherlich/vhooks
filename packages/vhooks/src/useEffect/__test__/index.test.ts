// import { reactive } from 'vue'
import { act } from '@m9ch/vhooks-test-utils'
import useEffect from '../index'

describe('useEffect', () => {
  it('should run the passed function once', async () => {
    const fnSpy = vi.fn(() => {})
    useEffect(fnSpy)
    await act()
    expect(fnSpy).toHaveBeenCalledTimes(1)
  })

  // it('should observe basic properties', async () => {
  //   let dummy!: number
  //   const counter = reactive({ num: 0 })
  //   useEffect(() => {
  //     dummy = counter.num
  //   }, [counter])
  //   await act()
  //   expect(dummy).toBe(0)
  //   counter.num = 7
  //   await act()
  //   expect(dummy).toBe(7)
  // })

  // it('should observe multiple Ref', async () => {
  //   let dummy!: number
  //   const counter = ref(0)
  //   useEffect(() => {
  //     dummy = counter.value
  //   }, [counter])
  //   await act()
  //   expect(dummy).toBe(0)
  //   counter.value = 7
  //   await act()
  //   expect(dummy).toBe(7)
  // })
})
