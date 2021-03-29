import pandas as pd
import datetime
import time
import pickle
import numpy as np

class ModelHelper():
    def __init__(self):
        pass

    def makePredictions(self, alcohol,percentageExpenditure, measles,bmi,hiv_aids,schooling, incomeGroup):
        incomeGroup_highIncome = 0
        incomeGroup_upperMiddleIncome = 0
        incomeGroup_lowIncome = 0
        incomeGroup_lowerMiddleIncome = 0
        # parse income group
        if (incomeGroup == "high income"):
            incomeGroup_highIncome = 1
        elif (incomeGroup == "upper middle income"):
            incomeGroup_upperMiddleIncome = 1
        elif (incomeGroup == "low income"):
            incomeGroup_lowIncome = 1
        elif (incomeGroup == "lower middle income"):
            incomeGroup_lowerMiddleIncome = 1
        else:
            pass

    

        input_pred = [[alcohol,percentageExpenditure, measles,bmi,hiv_aids,schooling,incomeGroup_highIncome,incomeGroup_upperMiddleIncome,incomeGroup_lowIncome,incomeGroup_lowerMiddleIncome]]


        filePath = 'finalized_model.sav'
        ada_load = pickle.load(open(filePath, 'rb'))

        X = np.array(input_pred)
        preds_singular = ada_load.predict(X)

        return preds_singular[0]

