import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useSettlementDispatch } from './SettlementCalculatorHooks';
import { useSettlementSelector } from './SettlementCalculatorHooks';
import { setPeople } from './slice/SettlementSlice';

import './SettlementCalculator.scss'

function SettlementCalculator() {
	const dispatch = useSettlementDispatch()
	const people = useSettlementSelector(state => state.settlement.people);
	console.log(people)

	const addPerson = () => {
		const updatedListOfPeople = people.map(person => person);
		updatedListOfPeople.push({
			firstname: 'placeholder',
			surname: 'placeholder'
		})
		dispatch(setPeople(updatedListOfPeople));
	}

	return (
		<div className="settlement-calculator">
			{people?.map(person => (
				<div className="settlement-calculator-person">{person.firstname} - {person.surname}</div>
			))}
			<Button variant="contained" onClick={addPerson} startIcon={<Add />}>
				Add Person
			</Button>
		</div>
	);
}

export default SettlementCalculator;
