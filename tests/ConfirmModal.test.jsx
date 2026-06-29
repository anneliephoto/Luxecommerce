import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmModal from '../src/components/ConfirmModal';

describe('ConfirmModal', () => {
  it('renders the title, body, and handles confirmation actions', async () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    const user = userEvent.setup();

    render(
      <ConfirmModal
        show
        title="Delete product"
        body="Are you sure you want to delete this product?"
        confirmLabel="Remove"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    expect(screen.getByText('Delete product')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to delete this product?')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /remove/i }));
    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
