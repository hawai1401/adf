import {
  RippleButton,
  RippleButtonRipples,
} from "../animate-ui/components/buttons/ripple";

export default function FallBackButton() {
  return (
    <ul className="menu menu-horizontal px-1">
      <li>
        <RippleButton
          variant="outline"
          className="rounded-full h-[33px]"
          disabled
        >
          Se connecter
          <RippleButtonRipples />
        </RippleButton>
      </li>
    </ul>
  );
}
