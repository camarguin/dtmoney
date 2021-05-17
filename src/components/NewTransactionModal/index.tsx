import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();
        await createTransaction({
            title,
            amount,
            category,
            type,
        })
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Close Modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Register Transaction</h2>
                <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <input placeholder="Value" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        isActive={type === "deposit"}
                        onClick={() => setType('deposit')}
                        activeColor="green">
                        <img src={incomeImg} alt="Deposit" />
                        <span>Deposit</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        isActive={type === "withdraw"}
                        onClick={() => setType('withdraw')}
                        activeColor="red">
                        <img src={outcomeImg} alt="Withdraw" />
                        <span>Withdraw</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
                <button type="submit">
                    Save
                </button>
            </Container>
        </Modal>
    )
}