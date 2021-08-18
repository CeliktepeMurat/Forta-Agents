import {
  TransactionEvent,
  FindingType,
  FindingSeverity,
  Finding,
  EventType,
  Network,
  HandleTransaction,
} from 'forta-agent'

import agent from '.'
import { COMPOUND_GOVERNANCE_ADDRESS, TOPICS, HashedSigs } from './utils'

describe('Detect Compound Governance Event', () => {
  let handleTransaction: HandleTransaction

  const createTxEvent = ({
    logs,
    addresses,
    status = true,
  }: any): TransactionEvent => {
    const tx: any = {}
    const receipt: any = { logs, status }
    const block: any = {}
    const address: any = { ...addresses }

    return new TransactionEvent(
      EventType.BLOCK,
      Network.MAINNET,
      tx,
      receipt,
      [],
      address,
      block
    )
  }

  beforeAll(() => {
    handleTransaction = agent.handleTransaction
  })

  describe('Handle Transaction', () => {
    it('should return empty finding', async () => {
      const GovEvent = {
        topics: [],
        address: COMPOUND_GOVERNANCE_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })
      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([])
    })

    it('should return empty finding - wrong address', async () => {
      const topicHash: string = HashedSigs[0].CREATE as string

      const GovEvent = {
        topics: [topicHash],
        address: '0x01',
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })
      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([])
    })

    it('should return empty finding - empty address', async () => {
      const topicHash: string = HashedSigs[0].CREATE as string

      const GovEvent = {
        topics: [topicHash],
        address: '',
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })
      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([])
    })

    describe('Successed Gov Transactions', () => {
      it('should return CREATE Proposal Event finding', async () => {
        const topicHash: string = HashedSigs[0].CREATE as string

        const GovEvent = {
          topics: [topicHash],
          address: COMPOUND_GOVERNANCE_ADDRESS,
        }
        const txEvent = createTxEvent({
          logs: [GovEvent],
        })

        const findings = await handleTransaction(txEvent)

        expect(findings).toStrictEqual([
          Finding.fromObject({
            name: 'COMPOUND GOVERNANCE EVENT',
            description: `Compound ${TOPICS.CREATE} Proposal Event is detected.`,
            alertId: 'NETHFORTA-8',
            protocol: 'Compound',
            type: FindingType.Unknown,
            severity: FindingSeverity.Info,
          }),
        ])
      })

      it('should return VOTE Proposal Event finding', async () => {
        const topicHash: string = HashedSigs[1].VOTE as string

        const GovEvent = {
          topics: [topicHash],
          address: COMPOUND_GOVERNANCE_ADDRESS,
        }
        const txEvent = createTxEvent({
          logs: [GovEvent],
        })

        const findings = await handleTransaction(txEvent)

        expect(findings).toStrictEqual([
          Finding.fromObject({
            name: 'COMPOUND GOVERNANCE EVENT',
            description: `Compound ${TOPICS.VOTE} Proposal Event is detected.`,
            alertId: 'NETHFORTA-8',
            protocol: 'Compound',
            type: FindingType.Unknown,
            severity: FindingSeverity.Info,
          }),
        ])
      })

      it('should return QUEUE Event finding', async () => {
        const topicHash: string = HashedSigs[2].QUEUE as string

        const GovEvent = {
          topics: [topicHash],
          address: COMPOUND_GOVERNANCE_ADDRESS,
        }
        const txEvent = createTxEvent({
          logs: [GovEvent],
        })

        const findings = await handleTransaction(txEvent)

        expect(findings).toStrictEqual([
          Finding.fromObject({
            name: 'COMPOUND GOVERNANCE EVENT',
            description: `Compound ${TOPICS.QUEUE} Proposal Event is detected.`,
            alertId: 'NETHFORTA-8',
            protocol: 'Compound',
            type: FindingType.Unknown,
            severity: FindingSeverity.Info,
          }),
        ])
      })

      it('should return EXECUTE Proposal Event finding', async () => {
        const topicHash: string = HashedSigs[3].EXECUTE as string

        const GovEvent = {
          topics: [topicHash],
          address: COMPOUND_GOVERNANCE_ADDRESS,
        }
        const txEvent = createTxEvent({
          logs: [GovEvent],
        })

        const findings = await handleTransaction(txEvent)

        expect(findings).toStrictEqual([
          Finding.fromObject({
            name: 'COMPOUND GOVERNANCE EVENT',
            description: `Compound ${TOPICS.EXECUTE} Proposal Event is detected.`,
            alertId: 'NETHFORTA-8',
            protocol: 'Compound',
            type: FindingType.Unknown,
            severity: FindingSeverity.Info,
          }),
        ])
      })

      it('should return CANCEL Proposal Event finding', async () => {
        const topicHash: string = HashedSigs[4].CANCEL as string

        const GovEvent = {
          topics: [topicHash],
          address: COMPOUND_GOVERNANCE_ADDRESS,
        }
        const txEvent = createTxEvent({
          logs: [GovEvent],
        })

        const findings = await handleTransaction(txEvent)

        expect(findings).toStrictEqual([
          Finding.fromObject({
            name: 'COMPOUND GOVERNANCE EVENT',
            description: `Compound ${TOPICS.CANCEL} Proposal Event is detected.`,
            alertId: 'NETHFORTA-8',
            protocol: 'Compound',
            type: FindingType.Unknown,
            severity: FindingSeverity.Info,
          }),
        ])
      })
    })

    describe('Failed Gov Transactions', () => {
      it('should return Failed CREATE Proposal Event finding', async () => {
        const topicHash: string = HashedSigs[0].CREATE as string

        const GovEvent = {
          topics: [topicHash],
          address: COMPOUND_GOVERNANCE_ADDRESS,
        }
        const txEvent = createTxEvent({
          logs: [GovEvent],
          status: false,
        })

        const findings = await handleTransaction(txEvent)

        expect(findings).toStrictEqual([
          Finding.fromObject({
            name: 'COMPOUND GOVERNANCE EVENT',
            description: `Compound Failed ${TOPICS.CREATE} Proposal event is detected.`,
            alertId: 'NETHFORTA-8',
            protocol: 'Compound',
            type: FindingType.Suspicious,
            severity: FindingSeverity.High,
          }),
        ])
      })

      it('should return Failed VOTE Proposal Event finding', async () => {
        const topicHash: string = HashedSigs[1].VOTE as string

        const GovEvent = {
          topics: [topicHash],
          address: COMPOUND_GOVERNANCE_ADDRESS,
        }
        const txEvent = createTxEvent({
          logs: [GovEvent],
          status: false,
        })

        const findings = await handleTransaction(txEvent)

        expect(findings).toStrictEqual([
          Finding.fromObject({
            name: 'COMPOUND GOVERNANCE EVENT',
            description: `Compound Failed ${TOPICS.VOTE} Proposal event is detected.`,
            alertId: 'NETHFORTA-8',
            protocol: 'Compound',
            type: FindingType.Suspicious,
            severity: FindingSeverity.High,
          }),
        ])
      })

      it('should return Failed QUEUE Event finding', async () => {
        const topicHash: string = HashedSigs[2].QUEUE as string

        const GovEvent = {
          topics: [topicHash],
          address: COMPOUND_GOVERNANCE_ADDRESS,
        }
        const txEvent = createTxEvent({
          logs: [GovEvent],
          status: false,
        })

        const findings = await handleTransaction(txEvent)

        expect(findings).toStrictEqual([
          Finding.fromObject({
            name: 'COMPOUND GOVERNANCE EVENT',
            description: `Compound Failed ${TOPICS.QUEUE} Proposal event is detected.`,
            alertId: 'NETHFORTA-8',
            protocol: 'Compound',
            type: FindingType.Suspicious,
            severity: FindingSeverity.High,
          }),
        ])
      })

      it('should return Failed EXECUTE Proposal Event finding', async () => {
        const topicHash: string = HashedSigs[3].EXECUTE as string

        const GovEvent = {
          topics: [topicHash],
          address: COMPOUND_GOVERNANCE_ADDRESS,
        }
        const txEvent = createTxEvent({
          logs: [GovEvent],
          status: false,
        })

        const findings = await handleTransaction(txEvent)

        expect(findings).toStrictEqual([
          Finding.fromObject({
            name: 'COMPOUND GOVERNANCE EVENT',
            description: `Compound Failed ${TOPICS.EXECUTE} Proposal event is detected.`,
            alertId: 'NETHFORTA-8',
            protocol: 'Compound',
            type: FindingType.Suspicious,
            severity: FindingSeverity.High,
          }),
        ])
      })

      it('should return Failed CANCEL Proposal Event finding', async () => {
        const topicHash: string = HashedSigs[4].CANCEL as string

        const GovEvent = {
          topics: [topicHash],
          address: COMPOUND_GOVERNANCE_ADDRESS,
        }
        const txEvent = createTxEvent({
          logs: [GovEvent],
          status: false,
        })

        const findings = await handleTransaction(txEvent)

        expect(findings).toStrictEqual([
          Finding.fromObject({
            name: 'COMPOUND GOVERNANCE EVENT',
            description: `Compound Failed ${TOPICS.CANCEL} Proposal event is detected.`,
            alertId: 'NETHFORTA-8',
            protocol: 'Compound',
            type: FindingType.Suspicious,
            severity: FindingSeverity.High,
          }),
        ])
      })
    })
  })
})
