import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Exchange } from "../generated/schema"
import { Exchange as ExchangeEvent } from "../generated/CurveRouter/CurveRouter"
import { handleExchange } from "../src/curve-router"
import { createExchangeEvent } from "./curve-router-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let receiver = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let route = [
      Address.fromString("0x0000000000000000000000000000000000000001")
    ]
    let swap_params = [BigInt.fromI32(234)]
    let pools = [
      Address.fromString("0x0000000000000000000000000000000000000001")
    ]
    let in_amount = BigInt.fromI32(234)
    let out_amount = BigInt.fromI32(234)
    let newExchangeEvent = createExchangeEvent(
      sender,
      receiver,
      route,
      swap_params,
      pools,
      in_amount,
      out_amount
    )
    handleExchange(newExchangeEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Exchange created and stored", () => {
    assert.entityCount("Exchange", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Exchange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Exchange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "receiver",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Exchange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "route",
      "[0x0000000000000000000000000000000000000001]"
    )
    assert.fieldEquals(
      "Exchange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "swap_params",
      "[234]"
    )
    assert.fieldEquals(
      "Exchange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pools",
      "[0x0000000000000000000000000000000000000001]"
    )
    assert.fieldEquals(
      "Exchange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "in_amount",
      "234"
    )
    assert.fieldEquals(
      "Exchange",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "out_amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
