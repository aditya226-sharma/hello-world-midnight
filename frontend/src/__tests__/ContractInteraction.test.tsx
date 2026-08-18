import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContractInteraction } from '../components/ContractInteraction';

describe('ContractInteraction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows disabled state when not connected', () => {
    render(<ContractInteraction connected={false} />);

    expect(screen.getByText('Smart Contract Interaction')).toBeInTheDocument();
    expect(
      screen.getByText('Connect your wallet to interact with the Hello World contract.'),
    ).toBeInTheDocument();
  });

  it('shows interaction form when connected', () => {
    render(<ContractInteraction connected={true} />);

    expect(screen.getByText('Store a Message')).toBeInTheDocument();
    expect(screen.getByText('Read Message')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your message...')).toBeInTheDocument();
  });

  it('enables store button when message is entered', () => {
    render(<ContractInteraction connected={true} />);

    const input = screen.getByPlaceholderText('Enter your message...');
    const storeButton = screen.getByText('Store Message');

    expect(storeButton).toBeDisabled();

    fireEvent.change(input, { target: { value: 'Hello Midnight!' } });
    expect(storeButton).toBeEnabled();
  });

  it('displays message after storing', async () => {
    render(<ContractInteraction connected={true} />);

    const input = screen.getByPlaceholderText('Enter your message...');
    fireEvent.change(input, { target: { value: 'Hello Midnight!' } });
    fireEvent.click(screen.getByText('Store Message'));

    expect(await screen.findByText('Hello Midnight!')).toBeInTheDocument();
  });

  it('shows transaction hash after store', async () => {
    render(<ContractInteraction connected={true} />);

    const input = screen.getByPlaceholderText('Enter your message...');
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(screen.getByText('Store Message'));

    expect(await screen.findByText(/Transaction Hash:/)).toBeInTheDocument();
  });

  it('displays stored message on read', async () => {
    render(<ContractInteraction connected={true} />);

    fireEvent.click(screen.getByText('Read from Contract'));

    expect(await screen.findByText('Stored Message:')).toBeInTheDocument();
  });
});
