import PromotionType from './models/promotion'

export default interface PricingRuleType {
  customer_id: number
  rules: Array<PromotionType>
}
