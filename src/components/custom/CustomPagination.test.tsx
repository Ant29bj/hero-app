import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type React from "react";
import type { PropsWithChildren } from "react";

const renderWithRouter = (component: React.ReactElement, initialEntries?: string[]) => {

  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
}


vi.mock('../ui/button', () => ({
  Button: ({ children, ...props }: PropsWithChildren) => (<button {...props}>{children}</button>)
}))

describe('CustomPagination', () => {

  test('should render component with default values', () => {

    renderWithRouter(<CustomPagination totalPages={5} />)

    expect(screen.getByText('Previous')).toBeDefined();
    expect(screen.getByText('Next')).toBeDefined();
  });

  test('should disable previous button when page number its 1', () => {

    renderWithRouter(<CustomPagination totalPages={5} />)
    const previousButton = screen.getByText('Previous');

    expect(previousButton.getAttributeNames()).toContain('disabled');
  });

  test('should disable previous button when page number is the last', () => {

    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5'])
    const nextButton = screen.getByText('Next');
    expect(nextButton.getAttributeNames()).toContain('disabled');
  });

  test('should disable previous button when page number is the last', () => {

    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5'])
    const nextButton = screen.getByText('Next');
    expect(nextButton.getAttributeNames()).toContain('disabled');
  });

  test('should disable current page button', () => {
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3'])
    const currentButton = screen.getByText('3');

    expect(currentButton.textContent).toContain('3');
    expect(currentButton.getAttribute('variant')).toContain('default');
  });

  test('should change page', () => {
    // mock
    renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3'])
    const button2 = screen.getByText('2');
    const currentButton = screen.getByText('3');

    expect(currentButton.getAttribute('variant')).toContain('default');

    // act
    fireEvent.click(button2);

    // assert
    expect(currentButton.getAttribute('variant')).toContain('outline');
    expect(button2.getAttribute('variant')).toContain('default');
  });


});