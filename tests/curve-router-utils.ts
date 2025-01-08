import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Exchange } from "../generated/CurveRouter/CurveRouter"

export function createExchangeEvent(
  sender: Address,
  receiver: Address,
  route: Array<Address>,
  swap_params: Array<BigInt>,
  pools: Array<Address>,
  in_amount: BigInt,
  out_amount: BigInt
): Exchange {
  let exchangeEvent = changetype<Exchange>(newMockEvent())

  exchangeEvent.parameters = new Array()

  exchangeEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  exchangeEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  exchangeEvent.parameters.push(
    new ethereum.EventParam("route", ethereum.Value.fromAddressArray(route))
  )
  exchangeEvent.parameters.push(
    new ethereum.EventParam(
      "swap_params",
      ethereum.Value.fromUnsignedBigIntArray(swap_params)
    )
  )
  exchangeEvent.parameters.push(
    new ethereum.EventParam("pools", ethereum.Value.fromAddressArray(pools))
  )
  exchangeEvent.parameters.push(
    new ethereum.EventParam(
      "in_amount",
      ethereum.Value.fromUnsignedBigInt(in_amount)
    )
  )
  exchangeEvent.parameters.push(
    new ethereum.EventParam(
      "out_amount",
      ethereum.Value.fromUnsignedBigInt(out_amount)
    )
  )

  return exchangeEvent
}
