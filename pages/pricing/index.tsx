import CustomPlan from '@/components/PricingComponents/CustomPlan'
import FreeTrial from '@/components/PricingComponents/FreeTrial'
import LongForm from '@/components/PricingComponents/LongForm'
import React from 'react';

import classes from "./pricing.module.css";

function pricing() {
  return (
    <div className={`${classes.pricing} flex justify-center bg-white gap-y-5 flex-wrap`}>
      <FreeTrial />
      {/* <LongForm /> */}
      <CustomPlan />
    </div>
  )
}

export default pricing
