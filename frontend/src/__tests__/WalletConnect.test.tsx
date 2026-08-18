import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WalletConnect } from '../components/WalletConnect';
import type { MidnightState } from '../hooks/useMidnight';

const defaultState: MidnightState = {
  connected: false,
  address: null,
  balance: null,
  network: null,
};

const connectedState: MidnightState = {
  connected: true,
  address: 'addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj83ws8lhrn648jjxtwq2ytjqp',
  balance: '1000000',
  network: 'preprod',
};

describe('WalletConnect', () => {
  const mockConnect = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders connect button when disconnected', () => {
    render(
      <WalletConnect
        state={defaultState}
        loading={false}
        error={null}
        onConnect={mockConnect}
        onDisconnect={mockDisconnect}
      />,
    );

    expect(screen.getByText('Connect Your Wallet')).toBeInTheDocument();
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('calls onConnect when connect button is clicked', async () => {
    render(
      <WalletConnect
        state={defaultState}
        loading={false}
        error={null}
        onConnect={mockConnect}
        onDisconnect={mockDisconnect}
      />,
    );

    fireEvent.click(screen.getByText('Connect Wallet'));
    expect(mockConnect).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when connecting', () => {
    render(
      <WalletConnect
        state={defaultState}
        loading={true}
        error={null}
        onConnect={mockConnect}
        onDisconnect={mockDisconnect}
      />,
    );

    expect(screen.getByText('Connecting...')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <WalletConnect
        state={defaultState}
        loading={false}
        error="Wallet not found"
        onConnect={mockConnect}
        onDisconnect={mockDisconnect}
      />,
    );

    expect(screen.getByText('Wallet not found')).toBeInTheDocument();
  });

  it('shows connected state with address', () => {
    render(
      <WalletConnect
        state={connectedState}
        loading={false}
        error={null}
        onConnect={mockConnect}
        onDisconnect={mockDisconnect}
      />,
    );

    expect(screen.getByText('Connected Wallet')).toBeInTheDocument();
    expect(screen.getByText('Disconnect')).toBeInTheDocument();
    expect(screen.getByText('Connected Wallet')).toBeInTheDocument();
  });

  it('shows balance when connected', () => {
    render(
      <WalletConnect
        state={connectedState}
        loading={false}
        error={null}
        onConnect={mockConnect}
        onDisconnect={mockDisconnect}
      />,
    );

    expect(screen.getByText('Balance: 1000000')).toBeInTheDocument();
  });

  it('shows network when connected', () => {
    render(
      <WalletConnect
        state={connectedState}
        loading={false}
        error={null}
        onConnect={mockConnect}
        onDisconnect={mockDisconnect}
      />,
    );

    expect(screen.getByText('Network: preprod')).toBeInTheDocument();
  });

  it('calls onDisconnect when disconnect button is clicked', async () => {
    render(
      <WalletConnect
        state={connectedState}
        loading={false}
        error={null}
        onConnect={mockConnect}
        onDisconnect={mockDisconnect}
      />,
    );

    fireEvent.click(screen.getByText('Disconnect'));
    expect(mockDisconnect).toHaveBeenCalledTimes(1);
  });
});
