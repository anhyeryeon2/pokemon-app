import { useEffect, useState } from "react"

export const useDebounce = (value, delay) => {
  const [devouncedValue, setDevouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDevouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
    //useEffect 안에서 return되는 함수는 컴포넌트가 리렌더링될 때마다 기존의 타이머를 취소해주는 역할을 합니다. 이렇게 하면 이전 타이머가 계속 남아 있지 않고, 최신 value에 대해서만 타이머가 동작하게 됩니다.
  }, [value, delay])
//딜레이가 끝나기전에 종속성배열에따라 useEffect가 다시되면 딜레이시간이 다시 초기화되서 시작
  
  return devouncedValue
}
