export interface TrashItem {
  name: string;
  reason: string;
  date: string;
}

export const trashItems: TrashItem[] = [
  {
    name: 'blockchain-toaster.exe',
    reason: 'Decentralised toast was not the future',
    date: '14/03/2024',
  },
  {
    name: 'todo-app-v47.zip',
    reason: 'The world needed exactly zero more todo apps',
    date: '02/01/2024',
  },
  {
    name: 'ai-powered-doorbell.py',
    reason: 'Kept telling guests to sod off',
    date: '19/08/2023',
  },
  {
    name: 'startup-idea-uber-for-dogs.pptx',
    reason: 'Dogs can\'t rate drivers',
    date: '30/05/2023',
  },
  {
    name: 'css-framework-from-scratch.scss',
    reason: 'Reinvented Tailwind but worse',
    date: '11/11/2022',
  },
  {
    name: 'smart-fridge-k8s-cluster.yaml',
    reason: 'Fridge kept restarting the milk pods',
    date: '07/04/2022',
  },
  {
    name: 'dating-app-for-servers.ts',
    reason: 'Couldn\'t handle rejection (HTTP 403)',
    date: '22/02/2022',
  },
  {
    name: 'nft-pixel-art-generator.js',
    reason: 'Came to senses before minting',
    date: '15/12/2021',
  },
];
