export default function QuickStartDocs() {
  return (
    <div className="mx-auto w-2xl min-w-0 p-6 text-white space-y-4 text-start xl:mx-auto max-w-[1280px]">
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">Quick Start</h2>
      <div className="mb-3 py-4">
        <p className="text-base text-muted-foreground">
          shadcn/ui is a set of beautifully-designed, accessible components and
          a code distribution platform. Works with your favorite frameworks and
          AI models. Open Source. Open Code.
        </p>

        <div>
          <p className="leading-[1.65rem] [:not(:first-child)]:mt-6">
            <strong className="font-semibold">
              This is not a component library. It is how you build your
              component library.
            </strong>
          </p>
          <p className="leading-[1.65rem] [:not(:first-child)]:mt-6">
            You know how most traditional component libraries work: you install
            a package from NPM, import the components, and use them in your app.
          </p>
          <p className="leading-[1.65rem] [:not(:first-child)]:mt-6">
            This approach works well until you need to customize a component to
            fit your design system or require one that isn’t included in the
            library.{" "}
            <strong className="font-semibold">
              Often, you end up wrapping library components, writing workarounds
              to override styles, or mixing components from different libraries
              with incompatible APIs.
            </strong>
          </p>
          <p className="leading-[1.65rem] [:not(:first-child)]:mt-6">
            This is what shadcn/ui aims to solve. It is built around the
            following principles:
          </p>
          <ul className="my-6 ml-6 list-disc">
            <li className="mt-2">
              <strong className="font-semibold">Open Code:</strong> The top
              layer of your component code is open for modification.
            </li>
            <li className="mt-2">
              <strong className="font-semibold">Composition:</strong> Every
              component uses a common, composable interface, making them
              predictable.
            </li>
            <li className="mt-2">
              <strong className="font-semibold">Distribution:</strong> A
              flat-file schema and command-line tool make it easy to distribute
              components.
            </li>
            <li className="mt-2">
              <strong className="font-semibold">Beautiful Defaults:</strong>{" "}
              Carefully chosen default styles, so you get great design
              out-of-the-box.
            </li>
            <li className="mt-2">
              <strong className="font-semibold">AI-Ready:</strong> Open code for
              LLMs to read, understand, and improve.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
