import { CustomActionButtonDetailsProps } from '../../types/Config/CustomActionButtonDetails';

export const CustomActionButtonDetails: React.FC<CustomActionButtonDetailsProps & { isLoading?: boolean }> = ({
  loadingComponent,
  isLoading,
  icon,
  label
}) => {
  const Icon = icon;
  return (
    <>
      {(!loadingComponent || !isLoading) && (
        <>
          <Icon className="h-5 w-5" />
          {label}
        </>
      )}
      {loadingComponent && isLoading && loadingComponent}
    </>
  );
};
