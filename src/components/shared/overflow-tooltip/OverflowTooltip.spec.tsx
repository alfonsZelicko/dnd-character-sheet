import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { OverflowTooltip, OverflowTooltipProps } from './OverflowTooltip';

const mockTooltipProps: OverflowTooltipProps = {
  arrow: true,
  placement: 'top',
};

const longText = 'This is a very long text that should overflow';
const shortText = 'This is short';

describe('OverflowTooltip', () => {
  beforeAll(() => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(<OverflowTooltip>{shortText}</OverflowTooltip>);

    const childElement = screen.getByText(shortText);

    expect(childElement).toBeInTheDocument();
  });

  it('does not display tooltip when text fits within container', () => {
    render(
      <div style={{ width: '200px' }}>
        <OverflowTooltip maxWidth={200}>
          <span>{shortText}</span>
        </OverflowTooltip>
      </div>
    );

    const childElement = screen.getByText(shortText);

    userEvent.hover(childElement);

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies ellipsis when text overflows the container', () => {
    render(
      <div style={{ width: '100px' }}>
        <OverflowTooltip maxWidth={100}>{longText}</OverflowTooltip>
      </div>
    );

    const childElement = screen.getByText(longText);

    expect(childElement).toHaveStyle({
      maxWidth: '100px',
    });
  });

  it('applies ellipsis when text overflows the container', () => {
    render(
      <div style={{ width: '100px' }}>
        <OverflowTooltip>{longText}</OverflowTooltip>
      </div>
    );

    const childElement = screen.getByText(longText);

    expect(childElement).toHaveStyle({
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    });
  });

  it('applies maxWidth correctly', () => {
    render(
      <OverflowTooltip {...mockTooltipProps} maxWidth={100}>
        {longText}
      </OverflowTooltip>
    );

    const textElement = screen.getByText(longText);

    expect(textElement).toHaveStyle('max-width: 100px');
  });

  it('unobserves ResizeObserver on unmount', () => {
    const mockResizeObserverInstance = {
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    };

    jest.spyOn(window, 'ResizeObserver').mockImplementation(() => mockResizeObserverInstance);

    const { unmount } = render(<OverflowTooltip {...mockTooltipProps}>Some text</OverflowTooltip>);

    unmount();
    expect(mockResizeObserverInstance.disconnect).toHaveBeenCalledTimes(1);
  });
});
