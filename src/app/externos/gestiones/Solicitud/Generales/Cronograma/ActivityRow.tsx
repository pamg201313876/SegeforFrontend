import React from 'react';
import { Table } from 'semantic-ui-react';
import CheckboxCell from './CheckboxCell';
import CronogramaActivity from './CronogramaActivity';

type Props = {
	cronogramaActivity: CronogramaActivity,
	// setCronogramaActivity: Function,
	// handleChange?: ({ name, value, cronogramaName }: any) => void
}

export default function ActivityRow({
	cronogramaActivity
}: Props) {
	// const handleChangeCallback = React.useCallback(props.handleChange !== undefined ? props.handleChange : () => {} , []);

	const handleCheckChange = (name: string, checked: boolean) => {
		switch(name){
			case "ene":
				cronogramaActivity.ene = checked;
			break
			case "feb":
				cronogramaActivity.feb = checked;
			break;
			case "mar":
				cronogramaActivity.mar = checked;
			break;
			case "abr":
				cronogramaActivity.abr = checked;
			break
			case "may":
				cronogramaActivity.may = checked;
			break;
			case "jun":
				cronogramaActivity.jun = checked;
			break;
			case "jul":
				cronogramaActivity.jul = checked;
			break
			case "ago":
				cronogramaActivity.ago = checked;
			break;
			case "sep":
				cronogramaActivity.sep = checked;
			break;
			case "oct":
				cronogramaActivity.oct = checked;
			break
			case "nov":
				cronogramaActivity.nov = checked;
			break;
			case "dic":
				cronogramaActivity.dic = checked;
			break;
		}
		// handleChangeCallback({name, value, cronogramaActivity})
		// props.setCronogramaActivity((oldValues: any) => ({
		// 	...oldValues,
		// 	[name]: checked,
		// }));
		
	}

	//checked={cronogramaActivity.ene} onChange={handleCheckChange}/>

	return (
		<Table.Row>
			<Table.Cell>{cronogramaActivity.label}</Table.Cell>
			<CheckboxCell name="ene" checked={cronogramaActivity.ene} onCheckChange={handleCheckChange} />
			<CheckboxCell name="feb" checked={cronogramaActivity.feb} onCheckChange={handleCheckChange} />
			<CheckboxCell name="mar" checked={cronogramaActivity.mar} onCheckChange={handleCheckChange} />
			<CheckboxCell name="abr" checked={cronogramaActivity.abr} onCheckChange={handleCheckChange} />
			<CheckboxCell name="may" checked={cronogramaActivity.may} onCheckChange={handleCheckChange} />
			<CheckboxCell name="jun" checked={cronogramaActivity.jun} onCheckChange={handleCheckChange} />
			<CheckboxCell name="jul" checked={cronogramaActivity.jul} onCheckChange={handleCheckChange} />
			<CheckboxCell name="ago" checked={cronogramaActivity.ago} onCheckChange={handleCheckChange} />
			<CheckboxCell name="sep" checked={cronogramaActivity.sep} onCheckChange={handleCheckChange} />
			<CheckboxCell name="oct" checked={cronogramaActivity.oct} onCheckChange={handleCheckChange} />
			<CheckboxCell name="nov" checked={cronogramaActivity.nov} onCheckChange={handleCheckChange} />
			<CheckboxCell name="dic" checked={cronogramaActivity.dic} onCheckChange={handleCheckChange} />
			{/* <Table.Cell><Checkbox onClick={handleCheckChange} name="ene" checked={props.cronogramaActivity.ene}/> </Table.Cell> */}
			{/* <Table.Cell><Checkbox onClick={handleCheckChange} name="feb" checked={props.cronogramaActivity.feb}/></Table.Cell>
			<Table.Cell><Checkbox onClick={handleCheckChange} name="mar" checked={props.cronogramaActivity.mar}/></Table.Cell>
			<Table.Cell><Checkbox onClick={handleCheckChange} name="abr" checked={props.cronogramaActivity.abr}/></Table.Cell>
			<Table.Cell><Checkbox onClick={handleCheckChange} name="may" checked={props.cronogramaActivity.may}/></Table.Cell>
			<Table.Cell><Checkbox onClick={handleCheckChange} name="jun" checked={props.cronogramaActivity.jun}/></Table.Cell>
			<Table.Cell><Checkbox onClick={handleCheckChange} name="jul" checked={props.cronogramaActivity.jul}/></Table.Cell>
			<Table.Cell><Checkbox onClick={handleCheckChange} name="ago" checked={props.cronogramaActivity.ago}/></Table.Cell>
			<Table.Cell><Checkbox onClick={handleCheckChange} name="sep" checked={props.cronogramaActivity.sep}/></Table.Cell>
			<Table.Cell><Checkbox onClick={handleCheckChange} name="oct" checked={props.cronogramaActivity.oct}/></Table.Cell>
			<Table.Cell><Checkbox onClick={handleCheckChange} name="nov" checked={props.cronogramaActivity.nov}/></Table.Cell>
			<Table.Cell><Checkbox onClick={handleCheckChange} name="dic" checked={props.cronogramaActivity.dic}/></Table.Cell> */}
		</Table.Row>
	)
}
