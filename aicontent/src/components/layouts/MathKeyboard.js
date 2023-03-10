import React, { useState } from 'react';
import { EditableMathField, addStyles } from 'react-mathquill';
import axios from 'axios';
import { getResponse } from '../../services/openaiService';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import Spinner from './Spinner';

const { CancelToken } = axios;
// import MathQuill styles
// import 'mathquill/build/mathquill.css';

// add MathQuill styles to the head of the document
addStyles();

const MathKeyboard = () => {
    const [latex, setLatex] = useState('');
    const [cancelToken, setCancelToken] = useState(null);

    const [formData, setFormData] = useState({ loading: false, generatedText: null });

    const { generatedText, loading } = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({ ...formData, loading: true });
        if (cancelToken) {
            cancelToken.cancel();
        }
        const source = CancelToken.source();
        setCancelToken(source);
        try {
            let prompt = `Please Solve the following with detailed explanation [${latex}].`;
            const result = await getResponse(prompt, 0.5, source.token);
            setFormData({ ...formData, generatedText: result, loading: false });
        } catch (error) {
            if (axios.isCancel(error)) {
                setFormData({ ...formData, loading: false });
                console.log('Request canceled');
            } else {
                console.log('Error', error.message);
            }
        }
    }
    // array of math symbols with their corresponding LaTeX code
    const symbols = [
        { label: '+', value: '+' },
        { label: '-', value: '-' },
        { label: '×', value: '\\times' },
        { label: '÷', value: '\\div' },
        { label: '√', value: '\\sqrt{}' },
        { label: '²', value: '^2' },
        { label: '³', value: '^3' },
        { label: '∫', value: '\\int' },
        { label: 'Σ', value: '\\sum' },
        { label: 'π', value: '\\pi' },
        { label: '≠', value: '\\neq' },
        { label: '≤', value: '\\leq' },
        { label: '≥', value: '\\geq' },
        { label: '∞', value: '\\infty' },
        { label: '∝', value: '\\propto' },
    ];
    function renderLine(line) {
        console.log(line)
        if (line.startsWith('$') && line.endsWith('$')) {
            return <InlineMath math={line} />;
        } else if (line.startsWith('\\(') && line.endsWith('\\)')) {
            return <InlineMath math={line} />;
        } else if (line.startsWith('$$') && line.endsWith('$$')) {
            return <BlockMath math={line} />;
        } else if (line.startsWith('\\')) {
            return <BlockMath math={line} />;
        } else if (line.startsWith('\\[') && line.endsWith('\\]')) {
            return <BlockMath math={line} />;
        } else {
            return <p>{line}</p>;
        }
    }

    function renderTextWithMath(textWithMath) {
        if (textWithMath) {
            const lines = textWithMath.split('\n');
            return lines.map((line, index) => <div key={index}>{renderLine(line)}</div>);
        }
    }
    // function to insert a math symbol into the input
    const insertSymbol = (value) => {
        const newLatex = `${latex}${value}`;
        setLatex(newLatex);
    };

    return (
        <>
            <math-field virtual-keyboard-mode="manual"></math-field>

            <div className='grid grid-cols-1'>
                <div className='bg-white p-6 w-full border-b'>
                    {/* render each math symbol button */}
                    {symbols.map((symbol) => (
                        <button className="p-4 text-black hover:bg-gray-100" key={symbol.value} onClick={() => insertSymbol(symbol.value)}>
                            {symbol.label}
                        </button>
                    ))}
                </div>
                <div className='w-full'>
                    <EditableMathField
                        latex={latex}
                        onChange={(mathField) => {
                            setLatex(mathField.latex());
                        }}
                    />
                </div>
                <div className="flex justify-center">
                    <button className='text-white bg-indigo-500 px-4 py-2 mt-6 rounded-lg hover:bg-indigo-600' onClick={handleSubmit}>Solve Problem</button>
                    {loading ? (
                        <p className="fixed bottom-10 cursor-pointer bg-red-500 border border-red-500 rounded-lg hover:bg-red-700 text-white font-bold py-2 px-8 hover:translate-y-[-10px] transition ease-in"
                            onClick={() => cancelToken.cancel()}> Stop Generating </p>
                    ) : (<></>)}
                </div>
                <div className="min-h-[20rem] flex-col p-6  border border-gray-200 rounded-lg shadow-md sm:my-4">
                    {!loading && generatedText && <pre style={{ whiteSpace: 'pre-wrap', fontFamily: ' Arial, sans-serif' }}>{renderTextWithMath(generatedText)}</pre>
                    }
                    {!generatedText && !loading && <div className="flex min-h-[20rem] justify-center items-center"><p className="text-2xl text-center text-gray-400">Answer will appear here.</p></div>}
                    {loading && <div className="spinnerH"><Spinner /></div>}
                    {/* {!loading && generatedText &&
                        <div className="cursor-pointer text-indigo-500 font-semibold mt-4 text-md hover:text-indigo-500" onClick={copyToClip}><i className="fa-regular fa-copy"></i>
                            <span className="ml-2">Copy to Clipboard</span>
                        </div>} */}
                    {/* {isSuccess && <p className="text-md text-indigo-700 font-light">The text is copied</p>} */}
                </div>
            </div>
        </>
    );
};

export default MathKeyboard;
