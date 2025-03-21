"use client"

import { Suspense } from "react"
import SeachComp from "./searchComp"

export default function SeachPage() {
  return (
    <Suspense fallback={"로딩 중"}>
      <SeachComp/>
    </Suspense>
  )
}
