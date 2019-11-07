interface Props {
  readonly onLoginWithHaxor: () => void;
  readonly onLoginWithLedger: () => void;
  readonly onGetHaxorExtension: () => void;
}
declare const PageColumn: ({
  onLoginWithHaxor,
  onLoginWithLedger,
  onGetHaxorExtension,
}: Props) => JSX.Element;
export default PageColumn;
