import { useAssets } from "./useAssets";
import useDepreciation from "./useDepreciation";
import useInventory from "./useInventory";

export const useLifecycle = () => {
  const { visibleAssets } = useAssets();
  const { totalDepreciated } = useDepreciation();
  const { totalAssets, totalCriticalAssets } = useInventory();

  return { totalAssets, totalDepreciated, visibleAssets, totalCriticalAssets };
};

export default useLifecycle;
