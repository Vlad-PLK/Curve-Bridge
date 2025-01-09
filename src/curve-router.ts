import { Exchange as ExchangeEvent } from "../generated/CurveRouter/CurveRouter"
import { Exchange } from "../generated/schema"
import { Bytes } from "@graphprotocol/graph-ts"

export function handleExchange(event: ExchangeEvent): void {
  let entity = new Exchange(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.receiver = event.params.receiver
  entity.swap_params = event.params.swap_params
  entity.route = event.params.route.map<Bytes>((address) => address as Bytes);
  entity.pools = event.params.pools.map<Bytes>((address) => address as Bytes);
  entity.in_amount = event.params.in_amount
  entity.out_amount = event.params.out_amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
