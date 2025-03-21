"use client"

import { Suspense } from "react"
import SeachComp from "./SearchComp"

export default function SeachPage() {
  return (
    <Suspense fallback={"로딩 중"}>
      <SeachComp/>
    </Suspense>
  )
}
