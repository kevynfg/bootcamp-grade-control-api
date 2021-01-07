import React from 'react';
import Action from './Action';

export default function GradesControl({ grades, onDelete, onPersist }) {
  const tableGrades = [];

  let currentStudent = grades[0].student;
  let currentSubject = grades[0].subject;
  let currentGrades = [];
  let id = 1;

  /* Verifica se a grade atual é diferente da grade armazenada
  se não for igual, armazena e a grade atual passa a ser a próxima  */
  grades.forEach((grade) => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
      });
      currentSubject = grade.subject;
      //Zera as notas, pois já foram inseridas acima
      currentGrades = [];
    }

    if (grade.student !== currentStudent) {
      currentStudent = grade.student;
    }

    //Caso passe da condição acima, armazena o que vier
    currentGrades.push(grade);
  });

  //Após o loop, inserimos o último item
  //que não é inserido durante o loop
  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currentGrades,
  });

  const grade = grades.find((grade) => grade.id === id);
  const handleActionClick = (id, type) => {
    if (type === 'delete') {
      onDelete(grade);
      return;
    }

    onPersist(onPersist);
  };

  return (
    <div className="center">
      {tableGrades.map(({ id, grades }) => {
        const finalGrade = grades.reduce((acc, curr) => {
          return acc + curr.value;
        }, 0);
        const gradeStyle =
          finalGrade >= 70 ? styles.goodGrade : styles.badGrade;
        return (
          <table style={styles.table} className="striped" key={id}>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Aluno</th>
                <th style={{ width: '20%' }}>Disciplina</th>
                <th style={{ width: '20%' }}>Avaliação</th>
                <th style={{ width: '20%' }}>Nota</th>
                <th style={{ width: '20%' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(
                ({ id, subject, student, type, value, isDeleted }) => {
                  return (
                    <tr key={id}>
                      <td>{student}</td>
                      <td>{subject}</td>
                      <td>{type}</td>
                      <td>{isDeleted ? '-' : value}</td>
                      <td>
                        <div>
                          <Action
                            id={id}
                            onActionClick={handleActionClick}
                            type={isDeleted ? 'add' : 'edit'}
                          />
                          {!isDeleted && (
                            <Action
                              onActionClick={handleActionClick}
                              type="delete"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td style={{ textAlign: 'right' }}>
                  <strong>Total:</strong>
                </td>
                <td>
                  <span style={gradeStyle}>{finalGrade}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        );
      })}
    </div>
  );
}

const styles = {
  goodGrade: {
    fontWeight: 'bold',
    color: 'green',
  },
  badGrade: {
    fontWeight: 'bold',
    color: 'red',
  },
  table: {
    margin: '20px',
    padding: '10px',
  },
};
