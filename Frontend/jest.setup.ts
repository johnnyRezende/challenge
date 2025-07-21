import "@testing-library/jest-dom";

//Mocking useRouter.push from next/navigation to use in test cases
export const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn().mockImplementation(() => {
      return {
        push: mockRouterPush,
      };
    }),
  };
});
