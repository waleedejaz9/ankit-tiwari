// ** Icons Import

import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { AiOutlineCalculator } from 'react-icons/ai';
import { RiMoneyDollarBoxLine } from 'react-icons/ri';
import { User } from 'react-feather';

export default [
  {
    id: 'mysocial',
    title: 'My Social',
    icon: <RiMoneyDollarBoxLine size={20} />,
    action: 'manage',
    resource: 'mysocial',
    children: [
      {
        id: 'myaccount',
        title: 'Social connect',
        icon: <RiMoneyDollarBoxLine size={20} />,
        navLink: '/mysocial/socialconnect',
        action: 'manage',
        resource: 'mysocial/socialconnect'
      },
      {
        id: 'myaccount',
        title: 'Social Proof',
        icon: <GiReceiveMoney size={20} />,
        navLink: '/mysocial/socialproof',
        action: 'manage',
        resource: 'mysocial/socialproof'
      },
      {
        id: 'myaccount',
        title: 'Reputation',
        icon: <AiOutlineCalculator size={20} />,
        navLink: '/mysocial/reputation',
        action: 'manage',
        resource: 'mysocial/reputation'
      }
    ]
  }
];
