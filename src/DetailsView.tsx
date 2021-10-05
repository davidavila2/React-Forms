import { Todo } from "./todo";

import { useForm, Controller, SubmitHandler, ControllerProps } from "react-hook-form";

import {
  Typography,
  TextField,
  Divider,
  Stack,
  Button,
} from '@mui/material';

function DetailsView(props: { item: Todo, resetItem: () => void }) {
  interface IFormInputs {
    name: string
    description: string
  }
  const { control, handleSubmit, setValue } = useForm();

  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log(data)
    if (props.item.id) {
      const updatedItem = Object.assign(props.item, data);
      console.log(updatedItem)
    } else {
      console.log(data)
    }
  }

  if (props.item?.id) {
    setValue('object', props.item);
  }

  interface InputProps extends Partial<ControllerProps> {}
  const Input = ({ control, name, ...controllerProps }: InputProps) => {
    return (
      <Controller
        name={name ?? ''}
        control={control}
        defaultValue={false}
        rules={{ required: true }}
        {...controllerProps}
        render={({ field }) => <TextField {...field} />}
      />
    )
  }

  return (
    <>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
      {props.item.id ? `Editing: ${props.item.name}` : 'Select a Item'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Stack divider={<Divider orientation="vertical" flexItem />} spacing={2}>
        <Input
          name="name"
          control={control}
          defaultValue={props.item.name ?? ''}
          />

        <Input
          name="description"
          control={control}
          defaultValue={props.item.description}
          />

        <Button color="success" variant="outlined" type="submit">{props.item.id ? 'Update': 'Create'}</Button>
        <Button color="error" variant="outlined" type="reset" onClick={() => props.resetItem()}>Cancel</Button>
        </Stack>
      </form>
    </>
  )
}

export default DetailsView